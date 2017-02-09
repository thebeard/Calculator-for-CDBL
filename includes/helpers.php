<?php

function get_site_title() {
	return SITE_TITLE;
}

function get_currencies_json() {
	$currencies_json = file_get_contents( "cache/currencies.json" );
    $currencies = json_decode( $currencies_json );
    return $currencies;
}

function get_currencies_select() {
	$currencies = get_currencies_json();
	echo '<select name="currency">';
	foreach( $currencies as $key => $currency ) {
		echo sprintf( '<option value="%s" data-symbol="%s">%s</option>', $key, $currency->symbol, $currency->name );
	}
	echo '</select>';
}