<?php
    // Some helpers
    include "includes/helpers.php";

    // Silly Defaults
    define( 'SITE_TITLE', 'Contractor\'s Rate & Fee Calculator' );
    $currency = "ZAR";

    // Process Coockies and Save Button
    if ( isset( $_COOKIE[ 'currency' ] ) ) $currency = $_COOKIE[ 'currency' ];
    if ( $_POST[ 'currency' ] ) {
        $currency = $_POST[ 'currency' ];
        setcookie( 'currency', $currency, time() + (86400 * 30 * 12), "/");
    }

?><!doctype html>
<html class="no-js" lang="en" dir="ltr">
<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo get_site_title(); ?></title>
    <link rel="stylesheet" href="css/foundation.css">
    <link rel="stylesheet" href="css/app.css">
</head>
<body>
    <div id="page" class="row" data-default="<?php echo $currency; ?>">
        <div class="small-8 columns small-offset-2">

            <div class="row margin-top">
                <div class="small-12 columns">
                    <div class="text-center">
                        <img src="assets/logo.png" width="167" style="margin-bottom: 9px" />
                    </div>
                    <h5 class="text-center"><?php echo get_site_title(); ?></h5>
                </div>
            </div>

            <div class="row">
                <form action="" method="post">
                    <div class="small-8 columns">
                        <label>Currency</label>
                        <?php echo get_currencies_select(); ?>
                    </div>
                    <div class="small-4 columns">
                        <input id="save-button" type="submit" class="button success" value="Save" />
                    </div>
                </form>
            </div>
            <hr />
            <div class="row">
                <div class="small-4 columns">
                    <label>Client Budget</label>
                </div>
                <div class="small-4 columns">                  
                </div>
                <div class="small-4 columns">
                    <label>Available Hours</label>
                </div>
            </div>
            <div class="row">
                <div class="small-4 columns usd">
                    <input type="text" name="budget_usd" />
                </div>
                <div class="small-4 columns symbol" data-symbol="R">
                     <input type="text" name="budget_local" disabled />
                </div>
                <div class="small-4 columns">
                    <input type="text" name="budget_hours" disabled />
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="small-12 columns">                        
                    <div class="row">
                        <div class="small-4 columns">
                            <label>My Rate</label>
                        </div>
                        <div class="small-4 columns">
                            <label>&nbsp;</label>
                        </div>
                        <div class="small-4 columns">
                            <label>Hours</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="small-4 columns usd">
                            <input type="text" name="hourly_usd" />
                        </div>
                        <div class="small-4 columns symbol" data-symbol="R">
                             <input type="text" name="hourly_local" disabled />
                        </div>
                        <div class="small-4 columns">
                            <input type="text" name="hours" />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="small-12 columns">                        
                    <div class="row">
                        <div class="small-4 columns">
                            <label>I Get</label>
                        </div>
                        <div class="small-4 columns">
                            <label>Estimate</label>
                        </div>
                        <div class="small-4 columns">
                            <label>Client Pays</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="small-4 columns usd">
                            <input type="text" name="paid_usd" disabled />
                        </div>
                        <div class="small-4 columns usd">
                             <input type="text" name="estimate_usd"/>
                        </div>
                        <div class="small-4 columns usd">
                            <input type="text" name="client_usd" disabled />
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="small-12 columns">                        
                    <div class="row">
                        <div class="small-4 columns">
                            <label>I Get</label>
                        </div>
                        <div class="small-4 columns">
                            <label>Estimate</label>
                        </div>
                        <div class="small-4 columns">
                            <label>Client Pays</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="small-4 columns symbol" data-symbol="R">
                            <input type="text" name="paid_local" disabled />
                        </div>
                        <div class="small-4 columns symbol" data-symbol="R">
                             <input type="text" name="estimate_local" disabled />
                        </div>
                        <div class="small-4 columns symbol" data-symbol="R">
                            <input type="text" name="client_local" disabled />
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div class="row">
                <div class="small-12 columns">                        
                    <div class="row">
                        <div class="small-4 columns">
                            <label>The rate I actually get</label>
                        </div>
                        <div class="small-4 columns">
                            <label>The rate calculated by</label>
                        </div>
                        <div class="small-4 columns">
                            <label>The rate the client pays</label>
                        </div>
                    </div>
                    <div class="row">
                        <div class="small-4 columns usd">
                            <input type="text" name="paid_rate_usd" disabled />
                        </div>
                        <div class="small-4 columns usd">
                             <input type="text" name="estimate_rate_usd" disabled />
                        </div>
                        <div class="small-4 columns usd">
                            <input type="text" name="client_rate_usd" disabled />
                        </div>
                    </div>
                    <div class="row">
                        <div class="small-4 columns symbol" data-symbol="R">
                            <input type="text" name="paid_rate_local" disabled />
                        </div>
                        <div class="small-4 columns symbol" data-symbol="R">
                             <input type="text" name="estimate_rate_local" disabled />
                        </div>
                        <div class="small-4 columns symbol" data-symbol="R">
                            <input type="text" name="client_rate_local" disabled />
                        </div>
                    </div>
                </div>
            </div>            
        </div>
    </div>
    <footer id="colophon"><?php echo get_site_title(); ?></footer>
    <script src="js/vendor/jquery.js"></script>
    <script src="js/vendor/what-input.js"></script>
    <script src="js/vendor/foundation.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
