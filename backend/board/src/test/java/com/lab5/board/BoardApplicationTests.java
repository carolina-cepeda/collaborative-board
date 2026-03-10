package com.lab5.board;

import com.lab5.board.model.LineMessage;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;

import static org.junit.jupiter.api.Assertions.*;
import com.lab5.board.controller.BoardController;

class BoardControllerTest {

    private BoardController controller;

    @BeforeEach
    void setUp() {
        controller = new BoardController();
    }


    @Test
    void handleDraw_shouldReturnTypeDraw() {
        LineMessage msg = buildMessage(100, 200, "#FF6B6B", "user-01");

        LineMessage result = controller.handleDraw(msg);

        assertEquals("draw", result.getType());
    }

    @Test
    void handleDraw_shouldPreserveCoordinates() {
        LineMessage msg = buildMessage(350.5, 120.0, "#FF6B6B", "user-01");

        LineMessage result = controller.handleDraw(msg);

        assertEquals(350.5, result.getX());
        assertEquals(120.0, result.getY());
    }

    @Test
    void handleDraw_shouldPreserveColor() {
        LineMessage msg = buildMessage(0, 0, "#4D96FF", "user-02");

        LineMessage result = controller.handleDraw(msg);

        assertEquals("#4D96FF", result.getColor());
    }

    @Test
    void handleDraw_shouldPreserveUserId() {
        LineMessage msg = buildMessage(0, 0, "#4D96FF", "user-02");

        LineMessage result = controller.handleDraw(msg);

        assertEquals("user-02", result.getUserId());
    }



    @Test
    void handleClear_debeRetornarTypeClear() {
        LineMessage msg = new LineMessage();

        LineMessage result = controller.handleClear(msg);

        assertEquals("clear", result.getType());
    }

    @Test
    void handleClear_debePreservarUserId() {
        LineMessage msg = new LineMessage();
        msg.setUserId("user-03");

        LineMessage result = controller.handleClear(msg);

        assertEquals("user-03", result.getUserId());
    }

    @Test
    void handleClear_debePreservarColor() {
        LineMessage msg = new LineMessage();
        msg.setColor("#20C997");

        LineMessage result = controller.handleClear(msg);

        assertEquals("#20C997", result.getColor());
    }


    private LineMessage buildMessage(double x, double y, String color, String userId) {
        LineMessage msg = new LineMessage();
        msg.setX(x);
        msg.setY(y);
        msg.setColor(color);
        msg.setUserId(userId);
        return msg;
    }
}