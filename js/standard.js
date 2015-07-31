

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

    });
	
	$("#txtAcconsentoInfo").click(function () {
		var db = window.sqlitePlugin.openDatabase({name: "DatabaseProva1"});
		db.transaction(function(tx) {
            tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
              console.log("res.rows.length: " + res.rows.length + " -- should be 1");
              console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
            });
          });
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

	
// Wait for Cordova to load
    //document.addEventListener("deviceready", onDeviceReady, false);

    // Cordova is ready
    function onDeviceReady() {
      var db = window.sqlitePlugin.openDatabase({name: "DatabaseProva1"});
		alert("Accesso al db");
      db.transaction(function(tx) {
        tx.executeSql('DROP TABLE IF EXISTS test_table');
        tx.executeSql('CREATE TABLE IF NOT EXISTS test_table (id integer primary key, data text, data_num integer)');

        // demonstrate PRAGMA:
        /*db.executeSql("pragma table_info (test_table);", [], function(res) {
          console.log("PRAGMA res: " + JSON.stringify(res));
        });*/

        tx.executeSql("INSERT INTO test_table (data, data_num) VALUES (?,?)", ["test", 100], function(tx, res) {
          console.log("insertId: " + res.insertId + " -- probably 1");
          console.log("rowsAffected: " + res.rowsAffected + " -- should be 1");

          db.transaction(function(tx) {
            tx.executeSql("select count(id) as cnt from test_table;", [], function(tx, res) {
              console.log("res.rows.length: " + res.rows.length + " -- should be 1");
              console.log("res.rows.item(0).cnt: " + res.rows.item(0).cnt + " -- should be 1");
            });
          });

        }, function(e) {
          console.log("ERROR: " + e.message);
        });
      });
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