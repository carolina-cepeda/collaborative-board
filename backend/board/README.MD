# Backend — Tablero Colaborativo

Tecnologías: **Java 21 + Spring Boot 4.0.3 + WebSocket + Lombok**

---

## Spring Initializr

Herramienta que genera la estructura de carpetas, el `pom.xml` con las dependencias seleccionadas y la clase principal anotada con `@SpringBootApplication`.

En este proyecto se configuró con:
- **Project:** Maven
- **Language:** Java 21
- **Dependencies:** Spring Web, WebSocket, Lombok

---

## WebSocket + STOMP

WebSocket es un protocolo de comunicación **bidireccional y persistente** entre cliente y servidor .STOMP es un protocolo de mensajería que corre sobre WebSocket y añade conceptos de destinos y suscripciones.

### Configuración

```java
@Configuration
@EnableWebSocketMessageBroker
public class WebSocketConfig implements WebSocketMessageBrokerConfigurer {

    @Override
    public void configureMessageBroker(MessageBrokerRegistry config) {
        config.enableSimpleBroker("/topic");          
        config.setApplicationDestinationPrefixes("/app"); 
    }

    @Override
    public void registerStompEndpoints(StompEndpointRegistry registry) {
        registry.addEndpoint("/ws-board")
                .setAllowedOrigins("http://localhost:5173") 
                .withSockJS();
    }
}
```

### Flujo de mensajes

```
Frontend                          Backend
   |                                 |
   |  /app/draw  (envía trazo)  →    |  @MessageMapping("/draw")
   |                                 |  @SendTo("/topic/board")
   |  ←  /topic/board (broadcast)    |  → reenvía a todos los clientes
```

### Controlador

```java
@Controller
public class BoardController {

    @MessageMapping("/draw")        
    @SendTo("/topic/board")         
    public LineMessage handleDraw(LineMessage message) {
        message.setType("draw");
        return message;
    }
}
```

---

## Lombok

Librería que **genera código repetitivo automáticamente** mediante anotaciones, evitando escribir getters, setters y constructores manualmente.

`@Data` genera: getters, setters, `toString`, `equals` y `hashCode`.

```java
@Data
public class LineMessage {
    private double x;
    private double y;
    private String color;
    private String userId;
    private String type;
}

```

---

## CORS

Cuando el frontend (puerto 5173) se comunica con el backend (puerto 8080), el navegador bloquea la petición por política de seguridad. Se habilita en `WebSocketConfig` con:

```java
.setAllowedOrigins("http://localhost:5173")
```

Para producción se reemplaza con la URL real del frontend en AWS.