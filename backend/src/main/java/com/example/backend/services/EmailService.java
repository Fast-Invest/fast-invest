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
        helper.setText("<h1>token</h1>"+
                        "<p>"+token+"</p>",true);//true habilita html
        mailSender.send(msg);//envia

    }


}