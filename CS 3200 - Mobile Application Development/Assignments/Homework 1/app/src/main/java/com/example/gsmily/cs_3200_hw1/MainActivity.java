//Created By Gavin Browning
//A01887359
package com.example.gsmily.cs_3200_hw1;

import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.view.Gravity;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity {
    int timesClicked;
    ViewGroup linearLayout;
    ViewGroup linearLayout2;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        linearLayout = (ViewGroup) findViewById(R.id.linearLayout);
        linearLayout2 = (ViewGroup) findViewById(R.id.linearLayout2);
        timesClicked = 0;
    }

    public void onClickHandlerAddText(View view) {

        TextView text = new TextView(this);
        text.setText(R.string.nougat);
        text.setTextSize(36);
        text.setGravity(Gravity.CENTER_VERTICAL | Gravity.CENTER_HORIZONTAL);
        linearLayout2.addView(text);

    }

    public void onClickHandlerAddButton(View view) {
        Button button = new Button(this);
        button.setText(R.string.new_button);
        if (timesClicked < 3) {
            linearLayout.addView(button);
            Toast.makeText(getBaseContext(), "Your Button is added to the screen", Toast.LENGTH_SHORT).show();
            timesClicked++;
        }
        else {
            Toast.makeText(getBaseContext(), "Hello Nougat User, you don't have any space left on screen", Toast.LENGTH_SHORT).show();
        }

        button.setOnClickListener(new View.OnClickListener() {
           public void onClick(View view) {
               Toast.makeText(getBaseContext(), "Hello, I am a newly created button!!", Toast.LENGTH_SHORT).show();
           }
        });

    }

}
