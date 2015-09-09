

/* dimensione testo */

$(document).on('vclick', '.small', function(e){
    $(".txtwrapper").css('font-size', '15px');
});

$(document).on('vclick', '.med', function(e){
    $(".txtwrapper").css('font-size', '20px');
});

$(document).on('vclick', '.large', function(e){
    $(".txtwrapper").css('font-size', '25px');
});

$(document).on("pageshow", "#page_index, #categorie, #page_lista_aziende, #circuiti, #page_dettaglio, #news, #promo, #page_dettaglio_newsPromo", function(){
	var $this = $( this ),
			theme = $this.jqmData( "theme" ) || $.mobile.loader.prototype.options.theme,
			msgText = $this.jqmData( "msgtext" ) || $.mobile.loader.prototype.options.text,
			textVisible = $this.jqmData( "textvisible" ) || $.mobile.loader.prototype.options.textVisible,
			textonly = !!$this.jqmData( "textonly" );
			html = $this.jqmData( "html" ) || "";
			$.mobile.loading( 'show', {
				text: msgText,
				textVisible: textVisible,
				theme: theme,
				textonly: textonly,
				html: html
			});	
});

$(document).ready(function () {
    $("#txtAcconsento").click(function () {
        if ($("#chkConferma_Richiesta").prop("checked") == true) {
            $("#chkConferma_Richiesta").prop("checked", false);
        }
        else {
            $("#chkConferma_Richiesta").prop("checked", true);
        }
    });
	
	$("#btnAllIndustry").click(function(){
		var rete = checkInternet();		
		if(rete == false){
			alert("Collegarsi ad internet per visualizzare la mappa aggiornata");
		}
	});
	
	$("#btnAggiornamento").click(function(){
		var rete = checkInternet();
		if(rete == true){
			window.requestFileSystem(window.TEMPORARY, 1024 * 1024, createDirAggiornamento, errorHandler);
		}		
	});

    $("#txtAcconsentoInfo").click(function () {
        if ($("#chkConferma_info").prop("checked") == true) {
            $("#chkConferma_info").prop("checked", false);
        }
        else {
            $("#chkConferma_info").prop("checked", true);
        }

    });

    $("#page_info").bind({
        popupafterclose: function (event, ui) { if (page == "registrazione") { $("#page_registrazione").popup("open"); page = ""; } else if (page == "info") { $("#page_richiestaInfo").popup("open"); page = ""; } }
    });
	
	$("#btnNavigazione").click(function(){
		var dest = $("#map-page").attr("destinazione");
		var lat = parseFloat(dest.split(",")[0]);
		var lon = parseFloat(dest.split(",")[1]);
		launchnavigator.navigate(
			  [lat, lon],
			  function(){
			  },
			  function(error){
				  alert("Plugin error: "+ error);
		});
	});
	
});

function createDirAggiornamento(fs){
	fs.root.getDirectory('dati', { create: true }, function (dirEntry) {
		dirEntry.getFile('log.txt', { create: true }, function (fileEntry) {
			// Create a FileWriter object for our FileEntry (log.txt).
			fileEntry.getMetadata(win,null);
			//if(window.differenza > 600000){
				fileEntry.createWriter(function (fileWriter) {
					var dati = "";
					$.getJSON("http://www.mvitalia.com/dimostrativi/patrizia/alex/trovo_x_te/admin/get_json_data.aspx", function (info) {
						dati = JSON.stringify(info);
						fileWriter.write(dati);
						fileWriter.onwriteend = function (e) {
							console.log("Write completed");
						};

						fileWriter.onerror = function (e) {
							console.log('Write failed: ' + e.toString());
						};
					});

				}, errorHandler);
			//}
		}, errorHandler);
		//window.requestFileSystem(dirEntry, 1024 * 1024, onInitFs, errorHandler);
		dirEntry.getFile('news.txt', { create: true }, function (fileEntry) {
			// Create a FileWriter object for our FileEntry (log.txt).
			//if(window.differenza > 600000){
				fileEntry.createWriter(function (fileWriter) {
					var dati = "";
					$.getJSON("http://www.trovoperte.com/admin/get_json_data_newsPromo.aspx?tipologia=news", function (info_news) {
						dati = JSON.stringify(info_news);
						fileWriter.write(dati);
						fileWriter.onwriteend = function (e) {
							console.log("write completed");
						};

						fileWriter.onerror = function (e) {
							console.log('Write failed: ' + e.toString());
						};
					});

				}, errorHandler);
			//}

		}, errorHandler);

		dirEntry.getFile('promo.txt', { create: true }, function (fileEntry) {
			// Create a FileWriter object for our FileEntry (log.txt).
			//if(window.differenza > 600000){
				fileEntry.createWriter(function (fileWriter) {
					var dati = "";
					$.getJSON("http://www.trovoperte.com/admin/get_json_data_newsPromo.aspx?tipologia=promo", function (info_promo) {
						dati = JSON.stringify(info_promo);
						fileWriter.write(dati);
						fileWriter.onwriteend = function (e) {
							console.log("write completed");
						};

						fileWriter.onerror = function (e) {
							console.log('Write failed: ' + e.toString());
						};
					});

				}, errorHandler);
			//}

		}, errorHandler);
	}, errorHandler);
}

/** CARICA LA MAPPA CON TUTTE LE AZIENDA REGISTRATE **/
function caricaAllIndustry(elencoMarker,page) {
    var defaultCenter = new google.maps.LatLng(44.7392354, 7.928849);
    drawMap(defaultCenter,page);

	
    function drawMap(latlng,page) {
            var myOptions = {
                zoom: 8,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };           
			
			var percorso_page = "";
			if (page == "index") {
				percorso_page = "page/";
			}
                var map = new google.maps.Map(document.getElementById("allIndustry_mapCanvas"), myOptions);
                // Add an overlay to the map of current lat/lng
                for (var i = 0; i < elencoMarker.length; i++) {
                var coorAzienda = new google.maps.LatLng(elencoMarker[i].lat, elencoMarker[i].lon)
                var marker = new google.maps.Marker({
                    position: coorAzienda,
                    map: map,
                    title: elencoMarker[i].nome,
                    url: percorso_page + "dettaglio.html?id_azienda=" + elencoMarker[i].id
                });
                google.maps.event.addListener(marker, 'click', function () {
                    window.location.href = this.url;
                });
            }
        }
}

/** CARICA LA MAPPA DELLA SINGOLA AZIENDA **/
function caricaMappa(coordinate,nomeAzienda) {
    var lat = parseFloat(coordinate.split(",")[0]);
    var lon = parseFloat(coordinate.split(",")[1]);
        var defaultLatLng = new google.maps.LatLng(lat,lon);  // Default to Hollywood, CA when no geolocation support

        drawMap(defaultLatLng);  // No geolocation support, show default map

        function drawMap(latlng) {
            var myOptions = {
                zoom: 10,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
            // Add an overlay to the map of current lat/lng
            var marker = new google.maps.Marker({
                position: latlng,
                map: map,
                title: nomeAzienda
            });
        }
        $("#map-page-popup").addClass("ui-overlay-shadow");
    }

/** APERTURA DELLE FORM DALLA PAGINA DELLE INFO **/	
var page = "";	
function apriRegistrazione() {
        page = "registrazione"
        $("#page_info").popup("close");
}
function apriInfo() {
        page = "info"
        $("#page_info").popup("close");
    }
  
  function checkInternet(){
		var networkState = navigator.connection.type;

		var states = {};
		states[Connection.UNKNOWN]  = 'Unknown connection';
		states[Connection.ETHERNET] = 'Ethernet connection';
		states[Connection.WIFI]     = 'WiFi connection';
		states[Connection.CELL_2G]  = 'Cell 2G connection';
		states[Connection.CELL_3G]  = 'Cell 3G connection';
		states[Connection.CELL_4G]  = 'Cell 4G connection';
		states[Connection.CELL]     = 'Cell generic connection';
		states[Connection.NONE]     = 'No network connection';
		
		if(states[networkState] == "No network connection" || states[networkState] == "Unknown connection"){
			return false;
		}
		else{
			return true;
		}
	}
  
/** CONVALIDA DEI DATI INSERITI NELLE FORM **/
function validateFormRegistrazione() {
		var internet = checkInternet();
	if(internet == true){
        var mail_reg_exp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;

        var moduloControllo = document.forms['form_registrazioneAzienda'];

        if (moduloControllo.nome.value.length == 0) {
            alert("Devi completare il campo: Nome");
            return false;
        }
        else if (moduloControllo.cognome.value.length == 0) {
            alert("Devi completare il campo: Cognome");
            return false;
        }
        else if (moduloControllo.r_soc.value.length == 0) {
            alert("Devi completare il campo: Ragione Sociale");
            return false;
        }
        else if (moduloControllo.piva.value.length == 0) {
            alert("Devi completare il campo: P.IVA");
            return false;
        }

        else if (moduloControllo.email.value.length == 0) {
            alert("Devi completare il campo: Mail");

            return false;
        }
        else if (moduloControllo.email.value.length != 0) {
            var corretto;
            var re = new RegExp(mail_reg_exp);
            corretto=re.test(moduloControllo.email.value);
            if (corretto == false) {
                alert("Devi completare il campo: Mail");
                return false;               
            }

            else if (moduloControllo.telefono.value.length == 0) {
                alert("Devi completare il campo: Telefono");
                return false;
            }
            else if (moduloControllo.cod_fisc.value.length == 0) {
                alert("Devi completare il campo: Codice fiscale");
                return false;
            }
            else if (moduloControllo.indirizzo.value.length == 0) {
                alert("Devi completare il campo: Indirizzo");
                return false;
            }
            else if (moduloControllo.cap.value.length == 0) {
                alert("Devi completare il campo: CAP");
                return false;
            }
            else if (moduloControllo.citta.value.length == 0) {
                alert("Devi completare il campo: Città");
                return false;
            }
            else if (moduloControllo.indirizzo.value.length == 0) {
                alert("Devi completare il campo: Indirizzo");
                return false;
            }
            else if ($("#chkConferma_Richiesta").prop("checked")==false) {
                alert("Devi completare il campo: Acconsento il trattamento dei dati personali");
                return false;
            }
        }
		return true;
    }   
	else{
		alert("Attenzione! Collegarsi a internet per inviare una richiesta.");
		return false;
	}
}
function validateFormInfo() {
		var internet = checkInternet();
	if(internet == true){
        var mail_reg_exp = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-]{2,})+\.)+([a-zA-Z0-9]{2,})+$/;

        var moduloControllo = document.forms['form_richiestaInfo'];

        if (moduloControllo.nome.value.length == 0) {
            alert("Devi completare il campo: Nome");
            return false;
        }
        else if (moduloControllo.cognome.value.length == 0) {
            alert("Devi completare il campo: Cognome");
            return false;
        }
       

        else if (moduloControllo.email.value.length == 0) {
            alert("Devi completare il campo: Mail");

            return false;
        }
        else if (moduloControllo.email.value.length != 0) {
            var corretto;
            var re = new RegExp(mail_reg_exp);
            corretto = re.test(moduloControllo.email.value);
            if (corretto == false) {
                alert("Devi completare il campo: Mail");
                return false;

            }
            else if (moduloControllo.richiesta.value == "") {
                alert("Devi completare il campo: Richiesta")
                return false;
            }
            else if ($("#chkConferma_info").prop("checked") == false) {
                alert("Devi completare il campo: Acconsento il trattamento dei dati personali");
                return false;
            }
        }
		return true;
        //alert("La sua richiesta di informazioni è stata inviata correttamente, le risponderemo non appena possibile. Grazie per la collaborazione.");
        //$("#txtNomeInfo, #txtCognomeInfo, #txtMailInfo, #richiesta").val("");
        //$("#chkConferma_info").prop("checked",false);
    }
	else{
		alert("Attenzione! Collegarsi a internet per inviare una richiesta.");
		return false;
	}
}

/** GET PARAMETER **/
function getParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.href);
  if(results == null)
    return "";
  else
    return results[1];
}

/** CARICAMENTO DELLE CITTA' NEL VETTORE**/
function caricaCitta(all) {
    var citta = new Array()
    for (var i = 0; i < all.length; i++) {
        if (all[i].paese != "") {
            if (all[i].paese.indexOf(",") != -1) {
                var aus = all[i].paese.split(",");
                for (var k = 0; k < aus.length; k++) {
                    citta.push(aus[k].trim());
                }
            }
            else {
                citta.push(all[i].paese.trim());
            }
        }
    }

    var cittaDefinitive = new Array();

    cittaDefinitive.push(citta[0]);

    for (var p = 1; p < citta.length; p++) {
        var trovato = false;
        for (var m = 0; m < cittaDefinitive.length; m++) {
            if (citta[p] == cittaDefinitive[m]) {
                trovato = true;
            }
        }
        if (!trovato) {
            cittaDefinitive.push(citta[p]);
        }
    }

    for (var k = 0; k < cittaDefinitive.length; k++) {
        $("#lstCitta").append("<option>" + cittaDefinitive[k] + "</option>");
    }

}