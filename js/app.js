( function( $ ) {


	$(document).foundation();

	$( document ).ready( function() {
		$( '[name="currency"]' ).val( $( 'form' ).data( 'default' ) );

		initCurrency();
		$( '[name="currency"]' ).bind( 'change', initCurrency );

		$( '[name="budget_usd"]' ).bind( 'keyup', function() {
			var budget_usd = $( this ).val();
			var budget_usd_array = budget_usd.split( '-' );
			var rate = $( 'form' ).data( 'rate' );

			for( i = 0; i < budget_usd_array.length; i++ ) {
				budget_usd_array[ i ] = parseInt( parseInt( budget_usd_array[ i ] ) * rate );
				if ( isNaN( budget_usd_array[ i ] ) ) budget_usd_array[ i ] = '';

			}

			$( '[name="budget_local"]' ).val( budget_usd_array.join( ' - ' )  );
		});

		$( '[name="hourly_usd"]' ).bind( 'keyup', function() {
			var hourly_usd = $( this ).val();
			var hourly_usd_array = hourly_usd.split( '-' );
			var rate = $( 'form' ).data( 'rate' );

			var total = 0;
			for( i = 0; i < hourly_usd_array.length; i++ ) {
				if ( hourly_usd_array[ i ] ) total += parseFloat( hourly_usd_array[ i ] );
				hourly_usd_array[ i ] = parseInt( parseInt( hourly_usd_array[ i ] ) * rate );
				if ( isNaN( hourly_usd_array[ i ] ) ) hourly_usd_array[ i ] = '';
			}

			$( '[name="hourly_usd"]' ).data( 'calc', total / hourly_usd_array.length );

			$( '[name="hourly_local"]' ).val( hourly_usd_array.join( ' - ' )  );

			calculateEstimate();
			calculateOthers();
		});

		$( '[name="hours"]' ).bind( 'keyup', function() {
			calculateEstimate();
			calculateOthers();
		});

		$( '[name="estimate_usd"]' ).bind( 'change', calculateOthers );
		$( '[name="estimate_usd"]' ).bind( 'keyup', calculateOthers );
		$( '[name="estimate_usd"]' ).bind( 'keyup', maybeCalculateOthers );

	} );

	function calculateOthers() {
		var estimate_usd = $( '[name="estimate_usd"]' ).val();
		var rate = $( 'form' ).data( 'rate' );

		if ( estimate_usd ) {
			$( '[name="paid_usd"]' ).val( parseInt( estimate_usd * 0.90 ) );
			$( '[name="client_usd"]' ).val( parseInt( estimate_usd * 1.15 ) );

			$( '[name="paid_local"]' ).val( parseInt( estimate_usd * 0.90 * rate ) );
			$( '[name="estimate_local"]' ).val( parseInt( estimate_usd  * rate ) );
			$( '[name="client_local"]' ).val( parseInt( estimate_usd * 1.15 * rate ) );
		}
	}

	function maybeCalculateOthers() {
		var estimate_usd = $( '[name="estimate_usd"]' ).val();
		var hourly_rate = $( '[name="hourly_usd"]' ).data( 'calc' );
		var hours_elem = $( '[name="hours"]' );
		var hours = hours_elem.val();
		if ( hourly_rate ) {
			hours_elem.val( parseInt( estimate_usd / hourly_rate ) );
		}
	}


	function calculateEstimate() {
		var hourly_rate = $( '[name="hourly_usd"]' ).data( 'calc' );
		var hours = $( '[name="hours"]' ).val();
		if ( !hourly_rate || !hours ) {
			$( '[name="estimate_usd"]' ).val( ' ' );
			return;
		} else {
			$( '[name="estimate_usd"]' ).val ( hourly_rate * hours );
		}
	}


	function initCurrency() {
		var currency = $( '[name="currency"]' ).val();
		var api_string = 'http://api.fixer.io/latest?base=USD&symbols=' + currency;
		( function( currency ) {
			$.get( api_string, function( data ) {
				$( 'form' ).data( 'rate', data.rates[ currency ] );
			});
		} )( currency ); 
	}

} )( jQuery );