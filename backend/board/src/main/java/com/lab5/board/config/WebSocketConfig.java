package com.lab5.board.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.messaging.simp.config.MessageBrokerRegistry;
import org.springframework.web.socket.config.annotation.*;

@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    /**
     * Configures the message broker to use simple prefixes; "/topic"
     * for broadcasting messages to clients, and "/app"
     * for messages sent from clients to the server.
     */
    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");
        config.setApplicationDestinationPrefixes("/app");
    }

    /**
     * Registers the /ws-board endpoint for WebSocket connections, allowing cross-origin requests
     * from frontend.                                            
     */
    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-board")
                .setAllowedOrigins("http://localhost:5173")
                .withSockJS();
    }
}