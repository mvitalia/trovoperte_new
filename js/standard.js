

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

/*$(document).on("click","#txtAcconsento",function(e){ 
		
		if ($("#chkConferma_Richiesta").prop("checked") == true) {
            $("#chkConferma_Richiesta").prop("checked", false);
        }
        else {
            $("#chkConferma_Richiesta").prop("checked", true);
        }
})*/

/*$(document).on("click",".free",function(){
	if($(".free input").prop("checked")==true){
			$(".free input").prop("checked",false)
		}
		else{
			$(".free input").prop("checked",true)
		}	
})

$(document).on("click",".base",function(){
	if($(".base input").prop("checked")==true){
			$(".base input").prop("checked",false)
		}
		else{
			$(".base input").prop("checked",true)
		}	
})
$(document).on("click",".intermedio",function(){
	if($(".intermedio input").prop("checked")==true){
			$(".intermedio input").prop("checked",false)
		}
		else{
			$(".intermedio input").prop("checked",true)
		}	
})
$(document).on("click",".avanzato",function(){
	if($(".avanzato input").prop("checked")==true){
			$(".avanzato input").prop("checked",false)
		}
		else{
			$(".avanzato input").prop("checked",true)
		}	
})

$(document).on("click",".free input",function(){
	if($(".free input").prop("checked")==true){
			$(".free input").prop("checked",false)
		}
		else{
			$(".free input").prop("checked",true)
		}	
})
$(document).on("click",".base input",function(){
	if($(".base input").prop("checked")==true){
			$(".base input").prop("checked",false)
		}
		else{
			$(".base input").prop("checked",true)
		}	
})
$(document).on("click",".intermedio input",function(){
	if($(".intermedio input").prop("checked")==true){
			$(".intermedio input").prop("checked",false)
		}
		else{
			$(".intermedio input").prop("checked",true)
		}	
})
$(document).on("click",".avanzato input",function(){
	if($(".avanzato input").prop("checked")==true){
			$(".avanzato input").prop("checked",false)
		}
		else{
			$(".avanzato input").prop("checked",true)
		}	
})*/

$(document).ready(function () {
	
	
    $("#txtAcconsento").click(function () {
		
        if ($("#chkConferma_Richiesta").prop("checked") == true) {
            $("#chkConferma_Richiesta").prop("checked", false);
        }
        else {
            $("#chkConferma_Richiesta").prop("checked", true);
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
	
	$(".free").click(function(){
		if($(".free input").prop("checked")==false){
			$(".radioAbbonamento input").prop("checked",false)
			$(".free input").prop("checked",true)
			
		}
		
	})
	
	$(".base").click(function(){
		if($(".base input").prop("checked")==false){
			$(".radioAbbonamento input").prop("checked",false)
			$(".base input").prop("checked",true)
			
		}
		
	})
	$(".intermedio").click(function(){
		if($(".intermedio input").prop("checked")==false){
			$(".radioAbbonamento input").prop("checked",false)
			$(".intermedio input").prop("checked",true)
			
		}
		
	})
	$(".avanzato").click(function(){		
			if($(".avanzato input").prop("checked")==false){
			$(".radioAbbonamento input").prop("checked",false)
			$(".avanzato input").prop("checked",true)
			
		}
		
		})
	
		
		$(".free input").click(function(){
			if($(".free input").prop("checked")==false){
			$(".radioAbbonamento input").prop("checked",false)
			$(".free input").prop("checked",true)
			
			}
		
		})
		
		$(".base input").click(function(){
			if($(".base input").prop("checked")==false){
			$(".radioAbbonamento input").prop("checked",false)
			$(".base input").prop("checked",true)
				
			}
			
			
		})
		
		
		/*$(".intermedio").click(function(){
			if($(".intermedio input").prop("checked")==false){
				$(".intermedio input").prop("checked",true)
				$(".pAbbonamento").css("font-weight","normal")
				
			}			
		})*/
		
		$(".intermedio input").click(function(){
			if($(".intermedio input").prop("checked")==false){
			$(".radioAbbonamento input").prop("checked",false)
			$(".intermedio input").prop("checked",true)
				
			}		
		})
		
		
		
		/*$(".avanzato").click(function(){
			if($(".avanzato input").prop("checked")==false){
				$(".avanzato input").prop("checked",true)
					$(".pAbbonamento").css("font-weight","normal")
					
			}
			
		})*/
		
		$(".avanzato input").click(function(){
			if($(".avanzato input").prop("checked")==false){
				$(".radioAbbonamento input").prop("checked",false)
				$(avanzato).prop("checked",true)
				
			}		
	
		})
	

		$("#page_info").bind({
        popupafterclose: function (event, ui) { if (page == "registrazione") { $("#page_registrazione").popup("open"); page = ""; } else if (page == "info") { $("#page_richiestaInfo").popup("open"); page = ""; } }
		});
	
})
	//$("#lstMacrocategorie").change(function(){alert("cioa")});



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

    var page = "";

    function apriRegistrazione() {
        page = "registrazione"
        $("#page_info").popup("close");
    }

    function apriInfo() {
        page = "info"
        $("#page_info").popup("close");
    }



   

    function validateFormRegistrazione() {
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
        else if (moduloControllo.ragione_sociale.value.length == 0) {
            alert("Devi completare il campo: Ragione Sociale");
            return false;
        }
        else if (moduloControllo.piva.value.length == 0) {
            alert("Devi completare il campo: P.IVA");
            return false;
        }

        else if (moduloControllo.mail.value.length == 0) {
            alert("Devi completare il campo: Mail");

            return false;
        }
        else if (moduloControllo.mail.value.length != 0) {
            var corretto;
            var re = new RegExp(mail_reg_exp);
            corretto=re.test(moduloControllo.mail.value);
            if (corretto == false) {
                alert("Devi completare il campo: Mail");
                return false;               
            }

            else if (moduloControllo.cell.value.length == 0) {
                alert("Devi completare il campo: Telefono");
                return false;
            }
            else if (moduloControllo.cod_fiscale.value.length == 0) {
                alert("Devi completare il campo: Codice fiscale");
                return false;
            }
            else if (moduloControllo.indirizzo.value.length == 0) {
                alert("Devi completare il campo: Indirizzo");
                return false;
            }
			 else if (moduloControllo.num.value.length == 0) {
                alert("Devi completare il campo: n.°");
                return false;
            }
            else if (moduloControllo.cap.value.length == 0) {
                alert("Devi completare il campo: CAP");
                return false;
            }
            else if (moduloControllo.paese.value.length == 0) {
                alert("Devi completare il campo: Città");
                return false;
            }
            else if (moduloControllo.provincia.value.length == 0) {
                alert("Devi completare il campo: Provincia");
                return false;
            }
			
			 else if (moduloControllo.username.value.length == 0) {
                alert("Devi completare il campo: Username");
                return false;
            }
			 else if (moduloControllo.password.value.length == 0) {
                alert("Devi completare il campo: Password");
                return false;
            }
			
			 else if (moduloControllo.macrocategoria.value == "") {
                alert("Devi completare il campo: Macrocategoria");
                return false;
            }
			 else if (moduloControllo.categoria.value == "") {
                alert("Devi completare il campo: Categoria");
                return false;
            }
			
            else if ($("#chkConferma_Richiesta").prop("checked")==false) {
                alert("Devi completare il campo: Acconsento il trattamento dei dati personali");
                return false;
            }
        }

		return true;
         //alert("La sua richiesta di registrazione è stata inviata correttamente, le risponderemo non appena possibile. Grazie per la collaborazione.");
        //$("#txtNomeRegistrazione, #txtCognomeRegistrazione, #txtMailRegistrazione, #txtTelRegistrazione, #txtRagioneSociale, #txtPIVA, #txtCodiceFiscale, #txtIndirizzo, #txtCAP, #txtCitta").val("");
        //$("#chkConferma_Richiesta").prop("checked",false);
        
    }



    function validateFormInfo() {

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

    function checkInternet() {
        var online = window.navigator.onLine;
        if (!online) {
            return false;
        } else {
            return true;
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

function prepara_link_areariservata(obj,page){
	var isMobile = {
		Android: function() {
			return navigator.userAgent.match(/Android/i);
		},
		BlackBerry: function() {
			return navigator.userAgent.match(/BlackBerry/i);
		},
		iOS: function() {
			return navigator.userAgent.match(/iPhone|iPad|iPod/i);
		},
		Opera: function() {
			return navigator.userAgent.match(/Opera Mini/i);
		},
		Windows: function() {
			return navigator.userAgent.match(/IEMobile/i);
		},
		any: function() {
			return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
		}
	};
	
	if( isMobile.any()){
		if (page == "index")
			obj.href = "page/login.html";
		else
			obj.href = "../page/login.html";
	} else {
		obj.href = "http://www.trovoperte.com/admin/";
	}
}