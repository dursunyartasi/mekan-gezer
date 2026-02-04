# Grupo Pro Chat System - Dockerfile
# PHP 8.2 with Apache

FROM php:8.2-apache

# Install system dependencies
RUN apt-get update && apt-get install -y \
    git \
    curl \
    libpng-dev \
    libonig-dev \
    libxml2-dev \
    libzip-dev \
    zip \
    unzip \
    libpq-dev \
    && docker-php-ext-install \
    pdo \
    pdo_pgsql \
    pgsql \
    mbstring \
    exif \
    pcntl \
    bcmath \
    gd \
    zip \
    && a2enmod rewrite \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /var/www/html

# Copy Grupo Pro files
# Note: You need to extract Grupo Pro from CodeCanyon here
COPY . /var/www/html/

# Create necessary directories
RUN mkdir -p \
    /var/www/html/uploads \
    /var/www/html/assets/files/avatars \
    /var/www/html/assets/cache \
    && chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Apache configuration
RUN echo '<Directory /var/www/html>\n\
    Options Indexes FollowSymLinks\n\
    AllowOverride All\n\
    Require all granted\n\
</Directory>' > /etc/apache2/conf-available/grupo.conf \
    && a2enconf grupo

# PHP Configuration
RUN echo 'memory_limit = 256M\n\
upload_max_filesize = 10M\n\
post_max_size = 10M\n\
max_execution_time = 300' > /usr/local/etc/php/conf.d/uploads.ini

# Expose port
EXPOSE 80

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD curl -f http://localhost/ || exit 1

# Start Apache
CMD ["apache2-foreground"]
