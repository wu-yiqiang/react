# 使用 Nginx 官方镜像作为基础
FROM nginx:alpine

# 删除默认配置
RUN rm /etc/nginx/conf.d/default.conf

# 复制自定义配置
COPY nginx.conf /etc/nginx/conf.d/

# 将静态文件复制到 Nginx 的目录
COPY dist/ /usr/share/nginx/html  #
