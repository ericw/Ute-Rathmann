set :user, "eric"
#set :runner, "root"
set :application, "uterathmann.com"

default_run_options[:pty] = true
#set :scm_passphrase, "allauctions" #This is your custom users password
set :repository,  "git://github.com/ericw/Ute-Rathmann.git"
set :branch, "master"
set :scm, :git

set :deploy_to, "/vol/home/eric/www/#{application}"

server "174.129.245.11", :app, :web, :db, :primary => true

namespace :deploy do
  desc "Restart Application"
  task :restart do
    run "touch #{current_path}/tmp/restart.txt"
  end

  [:start, :stop].each do |t|
    desc "#{t} task is a no-op with mod_rails"
    task t, :roles => :app do ; end
  end

  task :after_update_code do
    copy_config_files
    symlink_asset_files
    #set_execute_permissions
    #update_crontab
  end

end

desc "Copy shared config files to new release"
task :copy_config_files, :roles => :app do
  %w(database.yml).each do |conf|
    run "cp #{shared_path}/system/config/#{conf} #{release_path}/config/#{conf}"
  end
end

desc "Symlink the asset files"
task :symlink_asset_files, :roles => :app do
  run "ln -s #{shared_path}/system/assets/full #{release_path}/public/images/full"
  run "ln -s #{shared_path}/system/assets/thumbs #{release_path}/public/images/thumbs"
end
