#!/usr/bin/env ruby
#
# Build tool for combining the nurani_bundle_ui.js JavaScript files.
#
# Usage: ruby build.rb
# Author: James Andres
#
require 'fileutils'

@root = File.expand_path(File.dirname(__FILE__))

@src_files = [
  "src/drupal-integration.js",
  "src/BundleUI.js",
  "src/CloneBundle.js",
  "src/PassageBox.js",
  "src/Picker.js",
]
@out_file = "nurani_bundle_ui.js"

@prefix = "(function ($) {\n\n"
@suffix = "})(jQuery);"

# Ensure the out_file exists and has zero bytes
out_file = File.join(@root, @out_file)
FileUtils.touch(out_file)
File.truncate(out_file, 0)

# Write out the prefix, the contents of each src file and the suffix
File.open(out_file, 'a') do |f|
  f << @prefix

  @src_files.each do |file|
    path = File.join(@root, file)
    contents = File.open(path, 'rb').read

    # Indent all non-empty lines by 2 spaces (prettiness), add an extra newline
    contents.gsub!(/^(?!\n)/, '  ')

    f << contents + "\n"
  end

  f << @suffix
end
