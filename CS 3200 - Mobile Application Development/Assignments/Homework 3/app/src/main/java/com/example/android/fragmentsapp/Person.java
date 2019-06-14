package com.example.android.fragmentsapp;

public class Person {
    private String fullName;
    private int age;
    private String city;
    private String hobby;

    public Person(String fullName, int age, String city, String hobby) {
        this.fullName = fullName;
        this.age = age;
        this.city = city;
        this.hobby = hobby;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getHobby() {
        return hobby;
    }

    public void setHobby(String hobby) {
        this.hobby = hobby;
    }


}
