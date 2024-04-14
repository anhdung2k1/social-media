package com.example.memories.config;

import org.apache.kafka.clients.admin.AdminClient;
import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.apache.kafka.common.errors.TopicExistsException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.Collections;
import java.util.Properties;
import java.util.concurrent.ExecutionException;

@Configuration
public class KafkaDynamicTopic {
    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;
    private final Properties props = new Properties();

    @Bean
    public Properties DynamicTopicConfig(){
        props.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        return props;
    }
    public void createTopicDynamic(String newTopic) {
        try {
            AdminClient adminClient = AdminClient.create(props);
            NewTopic topic = new NewTopic(newTopic, Collections.emptyMap());
            adminClient.createTopics(Collections.singletonList(topic)).all().get();
        }
        catch (ExecutionException | InterruptedException e){
            if (e.getCause() instanceof TopicExistsException) {
                System.out.println("Topic already exists");
            } else {
                e.printStackTrace();
            }
        }
    }
    public void deleteTopicDynamic(String oldTopic){
        try {
            AdminClient adminClient = AdminClient.create(props);
            adminClient.deleteTopics(Collections.singletonList(oldTopic)).all().get();
        }
        catch (ExecutionException | InterruptedException e){
            if (e.getCause() instanceof TopicExistsException) {
                System.out.println("Topic already exists");
            } else {
                e.printStackTrace();
            }
        }
    }
}
