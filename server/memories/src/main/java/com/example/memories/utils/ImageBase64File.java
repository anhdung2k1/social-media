package com.example.memories.utils;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.example.memories.builder.Base64DecodedMultipartFile;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.net.URL;
import java.util.Base64;
import java.util.Objects;
import java.util.UUID;

@Transactional(rollbackOn = Exception.class)
@RequiredArgsConstructor
@Service
public class ImageBase64File {
    @Value("${bucket.name}")
    private String bucketName;
    @Autowired
    private AmazonS3 s3Client;
    private static final String pattern = "base64";

    public URL handleBase64Image(String fileBase64) throws IOException {
        int indexBase64 = fileBase64.indexOf(pattern);
        fileBase64 = fileBase64.substring(indexBase64 + pattern.length() + 1);
        byte[] fileByes = Base64.getDecoder().decode(fileBase64);
        MultipartFile file = new Base64DecodedMultipartFile(fileByes);
        File fileObj = convertMultiPartFileToFile(file);
        String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename() + ".jpg";
        s3Client.putObject(new PutObjectRequest(bucketName, fileName, fileObj));
        return s3Client.getUrl(bucketName, fileName);
    }
    private File convertMultiPartFileToFile(MultipartFile file) throws IOException {
        File convertedFile = new File(Objects.requireNonNull(file.getOriginalFilename()));
        try (FileOutputStream fos = new FileOutputStream(convertedFile)){
            fos.write(file.getBytes());
        } catch (IOException e) {
            throw new IOException("ERROR converting multipartFile to file", e);
        }
        return convertedFile;
    }
}
