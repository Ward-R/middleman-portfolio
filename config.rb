# config.rb

# General configuration
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'

# Activate and configure extensions
activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts
# For example, put a file named "layout.erb" in your layouts/ directory
# to be automatically applied to all template files.
# page '/*.xml', layout: false
# page '/*.json', layout: false
# page '/*.txt', layout: false

# Build-specific configuration
configure :build do
  # Minify CSS on build
  activate :minify_css

  # Minify Javascript on build
  # COMMENT OUT THIS LINE TEMPORARILY TO TEST IF MINIFICATION IS THE PROBLEM
  # activate :minify_javascript,
  #   compressor: ::Uglifier.new(harmony: true),
  #   inline: true,
  #   ignore: ['turbo.es2017-umd.js'] # Your previous change

  # Also ensure you have removed the separate config.define_setting :js_compress_options block

  # Optimize images on build (requires image_optim gem and system tools)
  # activate :imageoptim
end

# Development-specific configuration
# configure :development do
#   activate :livereload
# end
