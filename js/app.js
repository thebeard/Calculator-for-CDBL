( function( $ ) {


	$(document).foundation();

	$( document ).ready( function() {
		$( '[name="currency"]' ).val( $( '#page' ).data( 'default' ) );

		initCurrency();
		$( '[name="currency"]' ).bind( 'change', initCurrency );

		$( '[name="budget_usd"]' ).bind( 'keyup', function() {
			var budget_usd = $( this ).val();
			var budget_usd_array = budget_usd.split( '-' );
			var rate = $( '#page' ).data( 'rate' );

			for( i = 0; i < budget_usd_array.length; i++ ) {
				budget_usd_array[ i ] = parseInt( parseInt( budget_usd_array[ i ] ) * rate );
				if ( isNaN( budget_usd_array[ i ] ) ) budget_usd_array[ i ] = '';

			}

			$( '[name="budget_local"]' ).val( budget_usd_array.join( ' - ' )  );
		});

		$( '[name="hourly_usd"]' ).bind( 'keyup', function() {
			var hourly_usd = $( this ).val();
			var hourly_usd_array = hourly_usd.split( '-' );
			var rate = $( '#page' ).data( 'rate' );

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
		$( '[name="budget_usd"], [name="hourly_usd"]' ).bind( 'keyup', calculateClientHours );
	} );

	function calculateOthers() {
		var estimate_usd = $( '[name="estimate_usd"]' ).val();
		var rate = $( '#page' ).data( 'rate' );

		if ( estimate_usd != ' ' ) {
			$( '[name="paid_usd"]' ).val( parseInt( estimate_usd * 0.90 ) );
			$( '[name="client_usd"]' ).val( parseInt( estimate_usd * 1.15 ) );

			$( '[name="paid_local"]' ).val( parseInt( estimate_usd * 0.90 * rate ) );
			$( '[name="estimate_local"]' ).val( parseInt( estimate_usd  * rate ) );
			$( '[name="client_local"]' ).val( parseInt( estimate_usd * 1.15 * rate ) );

			if ( rate < estimate_usd ) {

				$( '[name="paid_rate_usd"]' ).val( parseInt( ( estimate_usd / $( '[name="hours"]' ).val() ) * 0.90 ) );
				$( '[name="estimate_rate_usd"]' ).val( parseInt( ( estimate_usd / $( '[name="hours"]' ).val() ) ) );
				$( '[name="client_rate_usd"]' ).val( parseInt( ( estimate_usd / $( '[name="hours"]' ).val() ) * 1.15 ) );

				$( '[name="paid_rate_local"]' ).val( parseInt( ( estimate_usd / $( '[name="hours"]' ).val() ) * 0.90 * rate ) );
				$( '[name="estimate_rate_local"]' ).val( parseInt( ( estimate_usd / $( '[name="hours"]' ).val() )  * rate ) );
				$( '[name="client_rate_local"]' ).val( parseInt( ( estimate_usd / $( '[name="hours"]' ).val() ) * 1.15 * rate ) );
			} else {
				$( '[name="paid_rate_usd"], [name="estimate_rate_usd"], [name="client_rate_usd"], [name="paid_rate_local"], [name="estimate_rate_local"], [name="client_rate_local"]' ).val(" ");
			}
		}
	}

	function calculateClientHours() {
		var budget = $( '[name="budget_usd"]' ).val();
		var budget_array = budget.split( '-' );

		var total = 0;
		for( i = 0; i < budget_array.length; i++ ) {
			if ( budget_array[ i ] ) total += parseFloat( budget_array[ i ] );
			budget_array[ i ] = parseInt( parseInt( budget_array[ i ] ) * rate );
			if ( isNaN( budget_array[ i ] ) ) budget_array[ i ] = '';
		}
		budget = total / budget_array.length;

		var rate = $( '[name="hourly_usd"]' ).val();
		var rate_array = rate.split( '-' );

		var total = 0;
		for( i = 0; i < rate_array.length; i++ ) {
			if ( rate_array[ i ] ) total += parseFloat( rate_array[ i ] );
			rate_array[ i ] = parseInt( parseInt( rate_array[ i ] ) * rate );
			if ( isNaN( rate_array[ i ] ) ) rate_array[ i ] = '';
		}
		rate = total / rate_array.length;

		if ( budget && rate ) {
			var sum =  budget / rate;
			$( '[name="budget_hours"] ' ).val( parseInt( sum ) );
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
		var symbol = $( 'option[value="' + currency + '"]').data( 'symbol' );
		$( 'div[data-symbol]' ).attr( 'data-symbol', symbol );

		$( 'input' ).not('[type="submit"]').val( ' ' );

		var api_string = 'http://api.fixer.io/latest?base=USD&symbols=' + currency;
		( function( currency ) {
			$.get( api_string, function( data ) {
				$( '#page' ).data( 'rate', data.rates[ currency ] );
			});
		} )( currency ); 
	}

} )( jQuery );