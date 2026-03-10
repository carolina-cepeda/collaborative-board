package com.lab5.board.controller;

import com.lab5.board.model.LineMessage;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class BoardController {

    /**
     * receives the lines that are being drawn in the frontend and updates the
     * information to all the clients connected to the board
     * 
     * @param message
     * @return
     */
    @MessageMapping("/draw")
    @SendTo("/topic/board")
    public LineMessage handleDraw(LineMessage message) {
        message.setType("draw");
        return message;
    }

    /**
     * Method to clean a board, it receives a message from the frontend in
     * /app/clear and sends
     * it to all clients
     * 
     * @return
     */
    @MessageMapping("/clear")
    @SendTo("/topic/board")
    public LineMessage handleClear(LineMessage message) {
        message.setType("clear");
        return message;
    }
}