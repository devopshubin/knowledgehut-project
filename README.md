# Deploying Nginx Server with Ansible Roles on CentOS and Ubuntu

This guide will walk you through the process of deploying an Nginx web server on both CentOS and Ubuntu servers using Ansible roles. Roles allow you to organize your Ansible code into reusable components, making it easier to manage your infrastructure.

## Prerequisites

Before you begin, ensure you have the following:

- Ansible installed on your local machine.
- Access to CentOS and Ubuntu servers with SSH keys configured for passwordless authentication.
- Basic knowledge of Ansible and Linux server administration.

## Steps

### Step 1: Create an Ansible Playbook

Create an Ansible playbook to define the roles required to install and configure Nginx on both CentOS and Ubuntu servers. You can name it `playbook.yaml`.

### Step 2: Create Ansible Roles

Create Ansible roles for Nginx installation and configuration. Roles help organize tasks and files into structured directories. You can create a role structure using the following command:
```bash
$ ansible-galaxy init roles/nginx
```

This will create the `nginx` role directory with the necessary structure.

`roles/nginx/tasks/main.yml`
  
- In the `nginx/tasks/main.yml` file, define the tasks for installing and configuring Nginx. This is where you place the tasks you previously had in the playbook.
- In the `handlers` directory, create a `main.yml` file that defines the handler to restart nginx when notified by the task.
- In the `templates` directory, place any files that need to be copied to the target host, such as `index.html.j2`.

### Step 3: Create an Inventory File

Create an Ansible inventory file (e.g., `inventory`) to specify the servers you want to deploy Nginx on.

### Step 4: Create an ansible.cfg file

Create an ansible configuration file and name it `ansible.cfg`.

### Step 5: Run the playbook

Run the playbook with the following command:
```bash
$ ansible-playbook playbook.yaml
```

After running the playbook, you will get the similar output as below:
```bash
PLAY [Provisioning Server] *****************************************************************************************************************************************

TASK [Gathering Facts] *********************************************************************************************************************************************
ok: [web01]
ok: [db01]

TASK [nginx : Install nginx] ***************************************************************************************************************************************
skipping: [db01]
changed: [web01]

TASK [nginx : Install nginx] ***************************************************************************************************************************************
skipping: [web01]
changed: [db01]

TASK [nginx : Start and enable nginx service] **********************************************************************************************************************ok: [web01]
changed: [db01]

TASK [nginx : Copy index.html file] ********************************************************************************************************************************skipping: [db01]
changed: [web01]

TASK [nginx : Copy index.html file] ********************************************************************************************************************************skipping: [web01]
changed: [db01]

RUNNING HANDLER [nginx : restart nginx] ****************************************************************************************************************************changed: [web01]
changed: [db01]

PLAY RECAP *********************************************************************************************************************************************************db01                       : ok=5    changed=4    unreachable=0    failed=0    skipped=2    rescued=0    ignored=0
web01                      : ok=5    changed=3    unreachable=0    failed=0    skipped=2    rescued=0    ignored=0
```

### Step 5: Verify Nginx Installation

After the playbook execution is complete, you can verify that Nginx is installed and running on your CentOS and Ubuntu servers by accessing their respective IP addresses or domain names in a web browser. You will get the similar results:
- ![ubuntu!](./Screenshot%20(78).png)
- ![centos!](./Screenshot%20(77).png)

### Conclusion

You have successfully deployed Nginx on both CentOS and Ubuntu servers using Ansible roles. This organized approach simplifies server configuration and ensures consistency across your infrastructure. You can now use Nginx to host web applications or static websites on your servers.