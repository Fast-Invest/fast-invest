package com.example.backend.services;
import java.nio.file.Files;
import java.nio.file.Paths;

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

    public void enviarEmail(String destinatario,String token) throws MessagingException
    {
        try
        {
        MimeMessage msg = mailSender.createMimeMessage(); //cria um objeto de email
        MimeMessageHelper helper = new MimeMessageHelper(msg,true);//true permite: Texto simples,HTML,Anexos (PDFs, imagens, etc),Imagens embutidas no corpo do HTML

        String html = Files.readString(Paths.get("src/main/resources/static/PasswordTemplate.html")).replace("{token}", token);
        helper.setTo(destinatario);
        helper.setSubject("token de recuperação"); 
        helper.setText(html,true);//true habilita html
        mailSender.send(msg);//envia
        }
        catch( Exception e)
        {
            throw new RuntimeException("Erro ao enviar email", e);
        }
    }


}