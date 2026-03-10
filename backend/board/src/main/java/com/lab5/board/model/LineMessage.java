package com.lab5.board.model;

import lombok.Data;

@Data
public class LineMessage {
    private double x;
    private double y;
    private String color;
    private String userId;
    private String type; 
}