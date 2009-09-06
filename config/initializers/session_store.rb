# Be sure to restart your server when you modify this file.

# Your secret key for verifying cookie session data integrity.
# If you change this key, all old sessions will become invalid!
# Make sure the secret is at least 30 characters and all random, 
# no regular words or you'll be exposed to dictionary attacks.
ActionController::Base.session = {
  :key         => '_uterathmann_session',
  :secret      => 'f400a4ae7c55f087d809eb6b638ba4c657e67211831ecabbb0d535974682eb9412a876518b8d2590d7e93ed6b0c42a20d99cdaaf33590f225b1d6aab13592e4f'
}

# Use the database for sessions instead of the cookie-based default,
# which shouldn't be used to store highly confidential information
# (create the session table with "rake db:sessions:create")
# ActionController::Base.session_store = :active_record_store
