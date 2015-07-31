<!--METADATA TYPE="typelib" UUID="CD000000-8B95-11D1-82DB-00C04FB1625D" NAME="CDO for Windows 2000 Type Library" -->
<!--METADATA TYPE="typelib" UUID="00000205-0000-0010-8000-00AA006D2EA4" NAME="ADODB Type Library" -->
<%


DIM corpoMessaggio, numeroCampi, invioA, invioDa, nomeDominio, indirizzoIp, modulo, browserSistemaOperativo

invioA =  "a.nota@mvitalia.com"

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
Flds(cdoSMTPServer) = "smtp.mvitalia.com" 
Flds(cdoSMTPServerPort) = 25
Flds(cdoSMTPAuthenticate) = cdoAnonymous ' 0
Flds.Update

With iMsg
  Set .Configuration = iConf
   .To = invioA
   .From = invioDa
   .sender=invioDa
   .Subject = "Contatto dal dominio " & nomeDominio
   .HTMLBody = "<img src='http://www.mvitalia.com/dimostrativi/patrizia/alex/trovo_x_te/app/img/logo_trovoperte.png' alt='logo trovo per te' style='float: center;' /><br><br><font face=verdana size=2>Contatto da " & nome & ", <br><br>" & corpoMessaggio & "<br><br><br> Questi i dati inseriti nel modulo presente alla pagina <b> " & modulo & " </b>da utente con indirizzo IP <b>" & indirizzoIp & " </b> browser e sistema operativo <b>" & browserSistemaOperativo  & "</b>"
   .Send
End With


' rendirizzamento
response.redirect("index.html")

%>



