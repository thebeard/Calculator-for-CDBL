<?php
    include "includes/definitions.php";
    include "includes/helpers.php";
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

    <div class="row">
        <div class="small-8 columns small-offset-2">

            <div class="row margin-top">
                <div class="large-12 columns">
                    <h3><?php echo get_site_title(); ?></h3>
                </div>
            </div>

            
            <form method="post" action="http://c-api.localhost.co/test.php" data-default="ZAR">
                <div class="row">
                    <div class="large-12 columns">
                        <label>Currency</label>
                        <?php echo get_currencies_select(); ?>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 columns">
                        <label>Client Budget</label>
                        <div class="row">
                            <div class="large-4 columns usd">
                                <input type="text" name="budget_usd" />
                            </div>
                            <div class="large-4 columns symbol" data-symbol="R">
                                 <input type="text" name="budget_local" disabled />
                            </div>
                            <div class="large-4"></div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 columns">                        
                        <div class="row">
                            <div class="large-4 columns">
                                <label>My Rate</label>
                            </div>
                            <div class="large-4 columns">&nbsp;</div>
                            <div class="large-4 columns">Hours</div>
                        </div>
                        <div class="row">
                            <div class="large-4 columns usd">
                                <input type="text" name="hourly_usd" />
                            </div>
                            <div class="large-4 columns symbol" data-symbol="R">
                                 <input type="text" name="hourly_local" disabled />
                            </div>
                            <div class="large-4 columns">
                                <input type="text" name="hours" />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 columns">                        
                        <div class="row">
                            <div class="large-4 columns">
                                <label>You Get</label>
                            </div>
                            <div class="large-4 columns">Estimate</div>
                            <div class="large-4 columns">Client Pays</div>
                        </div>
                        <div class="row">
                            <div class="large-4 columns usd">
                                <input type="text" name="paid_usd" disabled />
                            </div>
                            <div class="large-4 columns usd">
                                 <input type="text" name="estimate_usd"/>
                            </div>
                            <div class="large-4 columns usd">
                                <input type="text" name="client_usd" disabled />
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="large-12 columns">                        
                        <div class="row">
                            <div class="large-4 columns">
                                <label>You Get</label>
                            </div>
                            <div class="large-4 columns">Estimate</div>
                            <div class="large-4 columns">Client Pays</div>
                        </div>
                        <div class="row">
                            <div class="large-4 columns symbol" data-symbol="R">
                                <input type="text" name="paid_local" disabled />
                            </div>
                            <div class="large-4 columns symbol" data-symbol="R">
                                 <input type="text" name="estimate_local" disabled />
                            </div>
                            <div class="large-4 columns symbol" data-symbol="R">
                                <input type="text" name="client_local" disabled />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
    <footer id="colophon"><?php echo get_site_title(); ?></footer>
    <script src="js/vendor/jquery.js"></script>
    <script src="js/vendor/what-input.js"></script>
    <script src="js/vendor/foundation.js"></script>
    <script src="js/app.js"></script>
</body>
</html>
