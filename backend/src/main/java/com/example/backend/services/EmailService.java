package com.example.backend.services;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;;

@Service
public class EmailService{

    @Autowired
    private JavaMailSender mailSender;

    public void enviarEmail(String destinatario,String token) throws MessagingException{
        MimeMessage msg = mailSender.createMimeMessage(); //cria um objeto de email
        MimeMessageHelper helper = new MimeMessageHelper(msg,true);//true permite: Texto simples,HTML,Anexos (PDFs, imagens, etc),Imagens embutidas no corpo do HTML
        helper.setTo(destinatario);
        helper.setSubject("token de recuperação"); 
        helper.setText(
        "<div style='font-family: \"Segoe UI\", Tahoma, Geneva, Verdana, sans-serif; padding: 40px 20px; "
        + "background: linear-gradient(135deg, #15151a 0%, #1f1f27 100%); color: #f6f6f6; margin: 0;'>"
        + "  <div style='max-width: 520px; margin: auto; background: #1a1a22; border-radius: 12px; "
        + "padding: 32px 40px; box-shadow: 0 8px 24px rgba(0, 255, 156, 0.2); border: 1px solid #00ff9c;'>"
        + "    <h2 style='margin-top: 0; font-weight: 700; font-size: 1.8rem; color: #00ff9c; letter-spacing: 1.2px; "
        + "text-transform: uppercase; user-select: none;'>Recuperação de Senha</h2>"
        + "    <p style='line-height: 1.6; font-size: 1rem; margin: 16px 0; color: #605e68;'>"
        + "Você solicitou a recuperação da sua senha. Use o token abaixo para prosseguir com a redefinição:</p>"
        + "    <div style='background: #0d0d13; color: #00ff9c; font-family: \"Courier New\", Courier, monospace; "
        + "font-size: 2.4rem; font-weight: 700; letter-spacing: 0.3em; text-align: center; padding: 18px 0; "
        + "border-radius: 10px; box-shadow: 0 0 18px #00ff9c; user-select: all; margin: 28px 0;'>"
        + token
        + "    </div>"
        + "    <p style='line-height: 1.6; font-size: 1rem; margin: 16px 0; color: #605e68;'>"
        + "Se você não solicitou isso, pode ignorar este e-mail.</p>"
        + "    <p style='font-size: 0.75rem; color: #605e68; text-align: center; margin-top: 32px; user-select: none;'>"
        + "Este é um e-mail automático. Por favor, não responda.</p>"
        + "  </div>"
        + "</div>",
        true
        );//true habilita html
        mailSender.send(msg);//envia

    }


}