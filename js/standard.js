

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

        document.addEventListener("deviceready", function () {
            alert("123");
        }, false)

    });




    /* $("#form_richiestaInfo").validate();   
    $("#form-registrazioneAzienda").validate();*/


});


	

    function validateForm() {

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

                return false;
            }
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
        else if (moduloControllo.conferma.prop("checked") == false) {
            alert("Acconsentire trattamento dati");
            return false;
        }
    }

    function validateForm() {

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

                return false;
            }
        }
      else if(moduloControllo.richiesta.value.lenght == 0){
        alert("Devi completare il campo richiesta")
      }
        else if (moduloControllo.conferma.prop("checked") == false) {
            alert("Acconsentire trattamento dati");
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