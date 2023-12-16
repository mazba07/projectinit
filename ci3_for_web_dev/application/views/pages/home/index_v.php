<div class="row" style="margin-top: 60px">
    <div class="col-12 col-md-6 offset-md-3">
        <ol>
            <li>Change base url (Now its is look like: <code>$config['base_url'] = '';</code> )</li>
            <li>Set database configuration but database library has been loaded already
                (Now its is look like: <code>$autoload['libraries'] = array('database', 'session', 'form_validation');</code> )
            </li>
            <li>
                A core controller had been mad named: "My_Controller"
            </li>
            <li>
                A basic model has been mad name "My_model"
            </li>
            <li>
                A basic helper has been mad name "my_helper"
            </li>
            <li>A basic template has been mad. all template file in partials folder under views</li>
            <li>Some plugin has been added inside resource folder</li>
            <li>
                auto load file history
                <br>
                ===============
                <p><code>$autoload['libraries'] = array('database', 'session', 'form_validation');</code></p>
                <p><code>$autoload['helper'] = array('url', 'my_helper');</code>
                </p>
                <p><code>$autoload['model'] = array('My_model');</code>
                </p>
            </li>
            <li>
                Create (.htaccess)
                <pre>
                    <code>
RewriteEngine on
RewriteCond %{SCRIPT_FILENAME} !-d
RewriteCond %{SCRIPT_FILENAME} !-f
RewriteCond $1 !^(index\.php|public|robots\.txt)
RewriteRule ^(.*)$ ./index.php/$1 [L]
                    </code>
                </pre>

                ==========================
                For API development

                <pre>
                    <code>
                    RewriteEngine on
RewriteCond %{SCRIPT_FILENAME} !-d
RewriteCond %{SCRIPT_FILENAME} !-f
RewriteCond $1 !^(index\.php|public|robots\.txt)
RewriteRule ^(.*)$ ./index.php/$1 [L]
                    
                    
Header always set Access-Control-Allow-Origin "*"
Header always set Access-Control-Allow-Methods "POST, GET, OPTIONS, DELETE, PUT"
Header always set Access-Control-Max-Age "1000"
Header always set Access-Control-Allow-Headers "x-requested-with, Content-Type, origin, authorization, accept, client-security-token"

RewriteEngine On
RewriteCond %{REQUEST_METHOD} OPTIONS
RewriteRule ^(.*)$ $1 [R=200,L]
                    <code>
                </pre>

            </li>
        </ol>
    </div>
</div>