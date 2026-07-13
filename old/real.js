(() => {
	// Legacy modals are intentionally NOT supported
	const modal = [
		{
			match: {
				//childOf: "container",
				cssProps: {
					gap: "var(--custom-modal-padding) var(--space-8)",
				},
			},
			name: "actionBar",
		},
		{
			match: {
				//childOf: "container",
				cssProps: {
					boxSizing: "border-box",
					minHeight: "1px",
					paddingLeft: "0px",
					paddingRight: "0px",
				},
			},
			name: "body",
		},
		{
			match: {
				//childOf: "container",
				cssProps: {
					paddingBottom: "var(--custom-modal-padding-sm)",
				},
			},
			name: "bodySpacerBottom",
		},
		{
			match: {
				//childOf: "container",
				cssProps: {
                    flexGrow: "0",
					paddingTop: "var(--custom-modal-padding-md)",
				},
			},
			name: "bodySpacerTop",
		},
		{
			match: {
				cssProps: {
					borderRadius: "var(--custom-border-radius)",
				},
			},
			name: "container",
		},
		{
			match: {
				cssProps: {
					container: "modal-container / inline-size",
					height: "100vh",
				},
			},
			name: "outerContainer",
		},
		{
			match: {
				//childOf: "container",
				cssProps: {
					padding:
						"var(--custom-modal-padding-md) var(--custom-modal-padding) var(--custom-modal-padding-sm)",
				},
				directDescendant: true,
			},
			name: "section",
		},
		{
			match: {
				//childOf: "container",
				cssProps: {
					padding: "0 var(--custom-modal-padding) 0",
				},
				directDescendant: true,
			},
			name: "sectionHidden",
		},
	];
	const scroller = [
        {
            match: {
                cssProps: {
                    boxSizing: "border-box",
                    flex: "1 1 auto",
                    minHeight: "0px",
                    position: "relative",
                },
            },
            name: "scrollerBase",
        },
	];

	// https://discord.com/assets/web.8e789820953484bb.css
	// is the only supported one for now
	const classMap = {
		modal,
		scroller,
	};
	// TYPE: Record<keyof typeof classMap, Record<string, string>>
	const result = {}

	const t0 = performance.now();
	
	// Turn into a proper array in order to remove elements later for better
	// performance
	// TODO: maybe wrong, benchmark this
	const rules = [ ...document.styleSheets[0].cssRules ].filter(e => {
		// all useless
		if ( !(e instanceof CSSStyleRule) ) { return false }
		
		const sel = e.selectorText
		return (
			!sel.match( /\s+/g )
			&& !sel.match( /,/g )
			&& !sel.match( /\.(images|themes)-(dark|light)/g )
		)
	}) /* as CSSStyleRule[] */;
	const { length } = rules;
	const components = Object.keys( classMap );
	for ( let i = 0; i < length; i++ ) {
		const rule = rules[i];
		for ( const component of components ) {
			const elements = classMap[ component ]
			if ( !result[ component ] ) {
				result[ component ] = {}
				for ( const element of elements ) {
					result[ component ][ element.name ] = undefined
				}
			}

			for ( const element of elements ) {
				const propsToMatch = element.match.cssProps
				if ( !propsToMatch ) { continue }

				const vecCSSProps = Object.keys( propsToMatch )
				// Not a bool, because it has to match *all* props
				let unMatches = 0
				let info = {}
                // TODO: custom props, so use styleMap maybe ?
				const { style } = rule

				for ( const matchProp of vecCSSProps ) {
					const propValue = style[ matchProp ]
                    info = {
                        element,
                        lhs: propValue,
                        rhs: propsToMatch[ matchProp ],
                        rule,
                    }

                    if ( rule.selectorText === ".padding-size-sm__8a031" ) {
                        console.log( info )
                    }
					if ( propValue === propsToMatch[ matchProp ] ) {
						unMatches++
					}
				}

                const readableName = `${component}_${element.name}`
				if ( unMatches === vecCSSProps.length ) {
					result[ component ][ element.name ] = rule.selectorText
                    console.log( "Success for %o: %o", readableName, info )
					break
				} else {
					//console.warn( "%o does not match %o", readableName, propsToMatch );
					//break
				}
			}
		}
	}

	const t1 = performance.now();
	console.warn( "Result: %o, took %o ms", result, t1 - t0 )

	const BLACKLISTED_CLASSES = [
		"images-light",
		"images-dark",
		"theme-light",
		"theme-dark",
	];
	function getNormalClass( className ) {
		if ( BLACKLISTED_CLASSES.some( e => className === e ) ) { return }

		for ( const key of components ) {
			const mod = result[ key ];
			const keys = Object.keys( mod );
			const name = keys.find( e => mod[e] === `.${className}` );
			if ( !name ) {
				continue;
			}
	
			return [ key, name ].join( "_" );
		}
	}

	for ( const component of components ) {
		const classes = Object.values( result[ component ] )
		for ( const className of classes ) {
			const el = document.querySelector( className )
			if ( !el ) { continue }

			const readableClasses = [ ...el.classList ]
				.map( getNormalClass )
				.filter( Boolean )
				.map( e => `\t${e}` )
				.join( "\n" );
			if ( readableClasses === "" ) {
				return;
			}

			el.dataset.readableClass = `\n${readableClasses}\n`;
		}
	}
})();