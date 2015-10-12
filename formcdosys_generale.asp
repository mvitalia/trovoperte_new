<!--METADATA TYPE="typelib" UUID="CD000000-8B95-11D1-82DB-00C04FB1625D" NAME="CDO for Windows 2000 Type Library" -->
<!--METADATA TYPE="typelib" UUID="00000205-0000-0010-8000-00AA006D2EA4" NAME="ADODB Type Library" -->
<%


DIM corpoMessaggio, numeroCampi, invioA, invioDa, nomeDominio, indirizzoIp, modulo, browserSistemaOperativo

invioA =  "info@trovoperte.com"

invioDa =  Request.Form("email")
if invioDa = "" then
	invioDa = "info@trovoperte.com"
end if

'------------fine modifiche necessarie------------------

nomeDominio 				= Request.ServerVariables("HTTP_HOST")
indirizzoIp					= Request.ServerVariables("REMOTE_ADDR") 
modulo						= Request.ServerVariables("HTTP_REFERER")
browserSistemaOperativo		= Request.ServerVariables("HTTP_USER_AGENT")


FOR numeroCampi = 1 TO (Request.Form.Count() - 1)
   IF NOT Request.Form(numeroCampi) = "" THEN
      corpoMessaggio = corpoMessaggio & "<br>" & Request.Form.Key(numeroCampi) & " = " & Trim(Request.Form(numeroCampi))
      nome = " " & Trim(Request.Form(1))
	  cognome = " " & Trim(Request.Form(2))
      mail = " " & Trim(Request.Form(3))
   END IF
NEXT


	
DIM iMsg, Flds, iConf

Set iMsg = CreateObject("CDO.Message")
Set iConf = CreateObject("CDO.Configuration")
Set Flds = iConf.Fields

Flds(cdoSendUsingMethod) = cdoSendUsingPort
Flds(cdoSMTPServer) = "localhost" 
Flds(cdoSMTPServerPort) = 25
Flds(cdoSMTPAuthenticate) = cdoAnonymous ' 0
Flds.Update

With iMsg
  Set .Configuration = iConf
   .To = invioA
   .From = invioDa
   .sender=invioDa
   .Subject = "Contatto dal dominio " & nomeDominio
   .HTMLBody = "<img src='http://www.trovoperte.com/app/img/logo_trovoperte.png' alt='logo trovo per te' style='float: center;' /><br><br><font face=verdana size=2>Contatto da " & nome & ", <br><br>" & corpoMessaggio & "<br><br><br> Questi i dati inseriti nel modulo presente alla pagina <b> " & modulo & " </b>da utente con indirizzo IP <b>" & indirizzoIp & " </b> browser e sistema operativo <b>" & browserSistemaOperativo  & "</b>"
   .Send
End With


' rendirizzamento
'response.redirect("index.html?info=ok")

%>
<html>
<head>
    <script type="text/javascript" src="cordova.js"></script>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <link rel="stylesheet" href="css/jquery.mobile-1.4.5.min.css">
    <link rel="stylesheet" href="css/default_theme.min.css">
    <link rel="stylesheet" href="css/jquery.mobile.icons.min.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/jquery-1.11.2.min.js"></script>
    <script src="js/jquery.mobile-1.4.5.min.js"></script>    
 
<body>
    <div class="txtwrapper">
        <!-- Home -->
        <div data-role="page" id="page_index">
        	<div data-role="header" data-position="fixed">
                <a href="index.html" data-role="none" class="link_index">
                    <img src="img/logo_trovoperte.png" class="logo_trovo"></a>
            </div>
            <div data-role="main"  data-backbtn="false">
                <p style="text-align:center">Grazie per averci contattato!<br />La sua richiesta di informazioni è stata inviata correttamente, le risponderemo appena possibile.
                <br /><br /><br />
                <a href='index.html' data-icon='home' data-ajax="false" class='ui-btn ui-shadow ui-btn-inline ui-icon-home ui-btn-icon-left'>Home</a>
                <a href="#" data-iconpos="notext" data-mini="true" class="ui-btn ui-corner-all  ui-btn-inline ui-btn-b ui-icon-delete ui-mini ui-btn-icon-notext ui-btn-right" data-rel="back" data-icon="delete">&nbsp;</a></p>
            </div>

		</div>
    </div>
</body>
</html>


