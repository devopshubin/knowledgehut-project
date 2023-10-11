# Developing Grafana Dashboard for Prometheus Metrics for NGINX Application

**Problem Statement**:

In today's dynamic DevOps landscape, efficient monitoring and visualization of application metrics are crucial for maintaining performance and availability. However, building a clear and informative dashboard that effectively visualizes these metrics can be a challenging task. This project addresses the need for skilled DevOps professionals who can create insightful dashboards using Grafana to monitor Prometheus metrics from an NGINX application. By undertaking this project, learners will gain valuable hands-on experience in setting up monitoring, selecting and presenting relevant metrics, and leveraging visualization tools to enhance overall system observability.

## Intro

If you want to follow along, you need a Linux box. Preferably you would use Ubuntu 22.04 LTS as I do. You can use a virtual box to create it locally or maybe somewhere in the clouds.

## Installing Nginx

To install the latest stable nginx version, we need to add an official nginx repository. First of all, before installing Nginx itself, we need to install some prerequisites.

```bash
sudo apt update
sudo apt install curl gnupg2 ca-certificates lsb-release ubuntu-keyring
curl https://nginx.org/keys/nginx_signing.key | gpg --dearmor | sudo tee /usr/share/keyrings/nginx-archive-keyring.gpg >/dev/null
gpg --dry-run --quiet --no-keyring --import --import-options import-show /usr/share/keyrings/nginx-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/nginx-archive-keyring.gpg] http://nginx.org/packages/ubuntu `lsb_release -cs` nginx" | sudo tee /etc/apt/sources.list.d/nginx.list
sudo apt update
apt-cache policy nginx
sudo apt install nginx
```

Start and enable the Nginx server using the following command:

```bash
sudo systemctl start nginx
sudo systemctl enable nginx
```

Let's use the Ubuntu IP address (`http://<ip>/`) to check if we can access Nginx.

## Expose Basic Nginx Metrics

Let's create a new Nginx configuration file to add an additional server block with our metric module. If you used a different method to install Nginx, for example, default Ubuntu packages, you might have a different location for Nginx configurations.

Before creating a file, let me switch to the root Linux user. Later we will adjust Linux permissions and ownership.

```bash
sudo -s
```

Now the configuration file.

```bash
vim /etc/nginx/conf.d/status.conf
```

Optionally you can restrict this plugin to emit metrics to only the local host. It may be useful if you have a single Nginx instance and you install prometheus exporter on it as well. In case you have multiple Nginx servers, it's better to deploy the prometheus exporter on a separate instance and scrape all of them from a single exporter.

We'll use the `location` Nginx directive to expose basic metrics on port 8080 `/status` page.

```bash
nginx/status.conf

server {
    listen 8080;
    # Optionally: allow access only from localhost
    # listen 127.0.0.1:8080;

    server_name _;

    location /status {
        stub_status;
    }

```

Always verify if the configuration is valid before restarting Nginx.

```bash
nginx -t

```

To update the Nginx config *without downtime*, you can use reload command.

```bash
systemctl reload nginx
```

Now we can access `http://<ip>:8080/status` page. The output will be:

```bash
Active connections: 2 
server accepts handled requests
 4 4 3 
Reading: 0 Writing: 1 Waiting: 1 
```

Unfortunately, Open Source Nginx server only exposes these not-very useful metrics. I guess I would pay attention only to the active connections metric from here.

They decided to only provide meaningful metrics in the enterprise version of Nginx, which is called Nginx plus. I'll show you how to get around later in the tutorial.

## Install Nginx Prometheus Exporter

Still, let's fetch all the available metrics for now. We'll use the Nginx prometheus exporter to do that. It's a Golang application that compiles to a single binary without external dependencies, which is very easy to install.

First of all, let's create a folder for the exporter and switch directory.

```bash
mkdir /opt/nginx-exporter
cd /opt/nginx-exporter
```

As a best practice, you should always create a dedicated user for each application that you want to run. Let's call it an `nginx-exporter` user and a group.

```bash
sudo useradd --system --no-create-home --shell /bin/false nginx-exporter
```

From the releases pages on GitHub, let's find the latest version and copy the link to the appropriate archive. In my case, it's a standard amd64 platform.

We can use curl to download the exporter on the Ubuntu machine.

```bash
curl -L https://github.com/nginxinc/nginx-prometheus-exporter/releases/download/v0.11.0/nginx-prometheus-exporter_0.11.0_linux_amd64.tar.gz -o nginx-prometheus-exporter_0.11.0_linux_amd64.tar.gz
```

Extract the prometheus exporter from the archive.

```bash
tar -zxf nginx-prometheus-exporter_0.11.0_linux_amd64.tar.gz
```

You can also remove it to save some space.

```bash
rm nginx-prometheus-exporter_0.11.0_linux_amd64.tar.gz
```

Let's make sure that we downloaded the correct binary by checking the version of the exporter.

```bash
./nginx-prometheus-exporter --version
```

It's optional; let's update the ownership on the exporter folder.

```bash
chown -R nginx-exporter:nginx-exporter /opt/nginx-exporter
```

To run it, let's also create a systemd service file. In case it exits systemd manager can restart it. It's the standard way to run Linux daemons.

```bash
vim /etc/systemd/system/nginx-exporter.service
```

Make sure you update the scrape-uri to the one you used in Nginx to expose basic metrics. Also, update the Linux user and the group to match yours in case you used different names.

```bash
nginx-exporter.service

[Unit]
Description=Nginx Exporter
Wants=network-online.target
After=network-online.target

StartLimitIntervalSec=0

[Service]
User=nginx-exporter
Group=nginx-exporter
Type=simple
Restart=on-failure
RestartSec=5s

ExecStart=/opt/nginx-exporter/nginx-prometheus-exporter \
    -nginx.scrape-uri=http://localhost:8080/status

[Install]
WantedBy=multi-user.target
```

Enable the service to automatically start the daemon on Linux restart.

```bash
systemctl enable nginx-exporter
```

Then start the nginx prometheus exporter.

```bash
systemctl start nginx-exporter
```

To verify that Prometheus exporter can access nginx and properly scrape metrics, use curl command and default 9113 port for the exporter.

```bash
curl localhost:9113/metrics
```

Now you should be able to get the same metrics from the status page but in Prometheus format.

```bash
# HELP nginx_connections_accepted Accepted client connections
# TYPE nginx_connections_accepted counter
nginx_connections_accepted 8
# HELP nginx_connections_active Active client connections
# TYPE nginx_connections_active gauge
nginx_connections_active 1
# HELP nginx_connections_handled Handled client connections
# TYPE nginx_connections_handled counter
nginx_connections_handled 8
# HELP nginx_connections_reading Connections where NGINX is reading the request header
# TYPE nginx_connections_reading gauge
nginx_connections_reading 0
# HELP nginx_connections_waiting Idle client connections
# TYPE nginx_connections_waiting gauge
nginx_connections_waiting 0
# HELP nginx_connections_writing Connections where NGINX is writing the response back to the client
# TYPE nginx_connections_writing gauge
nginx_connections_writing 1
# HELP nginx_http_requests_total Total http requests
# TYPE nginx_http_requests_total counter
nginx_http_requests_total 8
# HELP nginx_up Status of the last metric scrape
# TYPE nginx_up gauge
nginx_up 1
```

## Install Prometheus

Now let's quickly install the latest version of prometheus on the same host.

Create a dedicated Linux user for Prometehus.

```bash
sudo useradd --system --no-create-home --shell /bin/false prometheus
```

Now go to the prometheus.io/download/ and get the download link for the latest version. You can use the `curl` or `wget` command to download Prometheus.

```bash
wget https://github.com/prometheus/prometheus/releases/download/v2.47.1/prometheus-2.47.1.linux-amd64.tar.gz
```

Then, we need to extract all Prometheus files from the archive.

```bash
tar -xvzf prometheus-2.47.1.linux-amd64.tar.gz
```

Usually, you would have a disk mounted to the data directory. For this tutorial, I will simply create a /data director. Also, you need a folder for Prometheus configuration files.

```bash
mkdir -p /data /etc/prometheus
```

Now, let's change the directory to Prometheus and move some files.

```baash
cd prometheus-2.47.1.linux-amd64
```

First of all, let's move the prometheus binary and a promtool to the /usr/local/bin/. promtool is used to check configuration files and Prometheus rules.

```bash
mv prometheus promtool /usr/local/bin/
```

Optionally, we can move console libraries to the Prometheus configuration directory. Console templates allow for the creation of arbitrary consoles using the Go templating language. You don't need to worry about it if you're just getting started.

```bash
mv consoles/ console_libraries/ /etc/prometheus/
```

Finally, let's move the example of the main prometheus configuration file.

```bash
mv prometheus.yml /etc/prometheus/prometheus.yml
```

To avoid permission issues, you need to set correct ownership for the `/etc/prometheus/` and `/data` directory.

```bash
chown -R prometheus:prometheus /etc/prometheus/ /data/
```

We're going to use systemd, which is a system and service manager for Linux operating systems. For that, we need to create a systemd unit configuration file.

```bash
vim /etc/systemd/system/prometheus.service
```

Make sure you're using the correct username and group. Also, check the data path.

```bash
prometheus.service

[Unit]
Description=Prometheus
Wants=network-online.target
After=network-online.target

StartLimitIntervalSec=0

[Service]
User=prometheus
Group=prometheus
Type=simple
Restart=on-failure
RestartSec=5s
ExecStart=/usr/local/bin/prometheus \
  --config.file=/etc/prometheus/prometheus.yml \
  --storage.tsdb.path=/data \
  --web.console.templates=/etc/prometheus/consoles \
  --web.console.libraries=/etc/prometheus/console_libraries \
  --web.listen-address=0.0.0.0:9090 \
  --web.enable-lifecycle

[Install]
WantedBy=multi-user.target
```

Before we launch Prometheus, let's add our Nginx Prometheus Exporter as a target.

```bash
vim /etc/prometheus/prometheus.yml
```

Update the job name to `nginx-prometheus-exporter` and port to `9113`.

```bash
/etc/prometheus/prometheus.yml

scrape_configs:
  # The job name is added as a label `job=<job_name>` to any timeseries scraped from this config.
  - job_name: "nginx-prometheus-exporter"

    # metrics_path defaults to '/metrics'
    # scheme defaults to 'http'.

    static_configs:
      - targets: ["localhost:9113"]
```

To automatically start the Prometheus after reboot, run enable.

```bash
systemctl enable prometheus
```

Then just start the Prometheus.

```bash
systemctl start prometheus
```

Now you can go to `http://<ip>:9090/` to check if the prometheus is working.

Under the `targets` section, you should have a single nginx-prometheus-exporter target.
![metrics](./Screenshots/Screenshot%20(99).png "prometheus-metrics")

Now, you can query your metrics from the Prometheus explorer tab. For example, you can use `nginx_connections_active` to get active nginx connections.
![metrics](./Screenshots/Screenshot%20(98).png "prometheus-metrics")

## Install Grafana

The next step is to install Grafana, which is much simpler since we can use official repository.
Run the following command to install Grafana:

```bash
apt install -y apt-transport-https software-properties-common
wget -q -O - https://packages.grafana.com/gpg.key | sudo apt-key add -
echo "deb https://packages.grafana.com/oss/deb stable main" | sudo tee -a /etc/apt/sources.list.d/grafana.list
apt update
apt install grafana -y
```

To automatically start and enable the Grafana after reboot, enable the service.

```bash
systemctl start grafana-server
systemctl enable grafana-server
```

Now you can access Grafana on port `http://<ip>:3000`. The username is `admin`, and the password is `admin` as well.

- First of all, let's add our Prometheus as a datasource.
- For the URL, use `http://localhost:9090` and click save and test.
- Let's create a new dashboard and call it Nginx.
- Create a new Panel.
- For the metrics use nginx_connections_active.
- For the legend {{ instance }}.
- Title: Active Connections.

The output will be:
![metrics](./Screenshots/Screenshot%20(100).png "grafana-dashboard")
