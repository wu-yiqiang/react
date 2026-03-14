Docker部署服务




-- 前端部署
 1. 更新系统
    sudo apt update && sudo apt upgrade -y
 2. 安装Docker
    sudo apt install -y docker.io
    sudo systemctl enable docker
 3.将/ventruan文件夹复制到Linux根目录
 4.拉取Nginx镜像
    docker pull nginx:latest
    如果拉取镜像报错，请设置Docker镜像
    root sudo tee /etc/docker/daemon.json << EOF
    {
        "registry-mirrors": [
            "https://docker.xuanyuan.me"
        ]
    }
    EOF
    
 5.重启Docker
    sudo systemctl daemon-reload
    sudo systemctl restart docker
6.创建Nginx服务并且测试Nginx配置是否正确
    docker run --rm  -v /venturan/software/nginx/nginx.conf:/etc/nginx/nginx.conf:ro   -v /venturan/web:/venturan/web:ro  nginx nginx -t
7.运行Nginx服务
    docker run -d   --name ngin   -p 8080:8080   -v /venturan/software/nginx/nginx.conf:/etc/nginx/nginx.conf:ro   -v /venturan/web:/venturan/web:ro   nginx
8.查看启动的Docker服务
    docker ps -a
9.重启Nginx服务
    docker restart 5f988cdd88b3
10.停止Nginx服务
    docker stop 5f988cdd88b3
11.删除Nginx服务
   docker rm f61cb42f2c42