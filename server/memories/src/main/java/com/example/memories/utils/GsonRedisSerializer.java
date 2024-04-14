package com.example.memories.utils;

import com.google.gson.Gson;
import org.springframework.data.redis.serializer.RedisSerializer;
import org.springframework.data.redis.serializer.SerializationException;

import java.nio.charset.Charset;
import java.nio.charset.StandardCharsets;

public class GsonRedisSerializer implements RedisSerializer<Object> {

    private final Gson gson;

    public GsonRedisSerializer(Gson gson) {
        this.gson = gson;
    }

    @Override
    public byte[] serialize(Object obj) throws SerializationException {
        if (obj == null) {
            return new byte[0];
        }
        return gson.toJson(obj).getBytes(StandardCharsets.UTF_8);
    }

    @Override
    public Object deserialize(byte[] bytes) throws SerializationException {
        if (bytes == null || bytes.length == 0) {
            return null;
        }
        String json = new String(bytes, StandardCharsets.UTF_8);
        return gson.fromJson(json, Object.class);
    }

}
