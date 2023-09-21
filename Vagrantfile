Vagrant.configure("2") do |config|

  config.vm.define "controller" do |controller|
    controller.vm.box = "ubuntu/jammy64"
    controller.vm.network "private_network", ip: "192.168.33.10"
    controller.vm.network "public_network"
    controller.vm.provider "virtualbox" do |vb|
        vb.memory = "2048"
        vb.cpus = 2
    end
    controller.vm.provision "shell", path: "script.sh" 
  end

  config.vm.define "node01" do |node01|
    node01.vm.box = "ubuntu/jammy64"
    node01.vm.network "private_network", ip: "192.168.33.11"
    node01.vm.network "public_network"
    node01.vm.provider "virtualbox" do |vb|
        vb.memory = "1024"
        vb.cpus = 2
    end
  end

  config.vm.define "node02" do |node02|
    node02.vm.box = "boxomatic/centos-stream-9"
    node02.vm.network "private_network", ip: "192.168.33.12"
    node02.vm.provider "virtualbox" do |vb|
        vb.memory = "1024"
        vb.cpus = 2
    end
  end

end
