# General configuration
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

# Activate and configure extensions
activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css
end
