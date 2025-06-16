# config.rb

# These requires should be at the very top of your config.rb
require 'json'
require 'fastimage'
require 'fileutils'

# General configurations (these can be at the top level, before the 'configure' block)
set :css_dir, 'stylesheets'
set :js_dir, 'javascripts'
set :images_dir, 'images'
# ... other general set statements ...

# ==========================================================
# AUTOMATICALLY GENERATE PHOTO GALLERY DATA FROM LOCAL IMAGES
# Place this entire block inside 'configure do'
# ==========================================================
configure do
  # Define the path to your photo folder relative to the source directory
  PHOTO_GALLERY_DIR = 'images/portfolio_photography'
  PHOTO_DATA_FILE = 'data/photography_data.json' # Where to save the generated JSON

  # In a `configure` block, `self` refers to the Middleman application instance.
  # So you can directly call `source_dir`, `root`, `build_dir`, etc.
  photo_full_path = File.join(source_dir, PHOTO_GALLERY_DIR)

  # Ensure the directory exists
  unless File.directory?(photo_full_path)
    puts "Warning: Photo gallery directory not found at #{photo_full_path}. No photo data will be generated."
  else
    # Get a list of image files
    image_files = Dir.glob(File.join(photo_full_path, '*.{jpg,jpeg,png,gif,webp}'), File::FNM_CASEFOLD).sort

    resources = []
    image_files.each do |file_path|
      filename = File.basename(file_path)
      alt_text = filename.gsub(/[-_.]/, ' ').sub(/\s(jpg|jpeg|png|gif|webp)$/i, '').strip.capitalize
      caption_text = ""

      width, height = FastImage.size(file_path) rescue [nil, nil]

      resources << {
        filename: filename,
        alt: alt_text,
        caption: caption_text,
        width: width,
        height: height
      }
    end

    # Create the data directory if it doesn't exist
    data_dir_path = File.join(source_dir, File.dirname(PHOTO_DATA_FILE))
    FileUtils.mkdir_p(data_dir_path) unless File.directory?(data_dir_path)

    # Write the JSON data to the specified file
    File.write(File.join(source_dir, PHOTO_DATA_FILE), JSON.pretty_generate({ resources: resources }))

    puts "Generated #{resources.length} photo entries in #{PHOTO_DATA_FILE}"
  end
end
# ==========================================================
# END AUTOMATIC DATA GENERATION
# ==========================================================


# Activate and configure extensions
activate :autoprefixer do |prefix|
  prefix.browsers = "last 2 versions"
end

# Layouts
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Build-specific configuration
configure :build do
  activate :minify_css
  activate :minify_javascript
  # activate :imageoptim # If using, uncomment 'gem "image_optim"' in Gemfile
end

# configure :development do
#   activate :livereload
# end
