package com.example.android.fragmentsapp;

import android.content.Intent;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.support.design.widget.FloatingActionButton;
import android.support.v4.app.FragmentManager;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

public class MainActivity extends AppCompatActivity
implements DetailActivityFragment.FragmentListener{
    private boolean mTablet;
    private ViewGroup fragmentContainer;
    private EditText dataTextFullName, dataTextAge, dataTextCity, dataTextHobby;
    private Person person;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Toolbar toolbar = (Toolbar) findViewById(R.id.toolbar);
        setSupportActionBar(toolbar);

        fragmentContainer = (ViewGroup) findViewById(R.id.detail_fragment_container);
        mTablet = (fragmentContainer != null);

        TextView tvOut = (TextView) findViewById(R.id.textOut);
        tvOut.setText("Fragments side-by-side? " + mTablet);

        Button enterButton = (Button) findViewById(R.id.enterButton);
        assert enterButton != null;
        enterButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                    viewDetailFragment();
            }
        });

        dataTextFullName = (EditText)findViewById(R.id.dataTextFullName);
        dataTextAge = (EditText)findViewById(R.id.dataTextAge);
        dataTextCity = (EditText)findViewById(R.id.dataTextCity);
        dataTextHobby = (EditText)findViewById(R.id.dataTextHobby);

        Button displayButton = (Button) findViewById(R.id.displayButton);
        assert displayButton != null;
        displayButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                if (person == null) {
                    Toast.makeText(getBaseContext(), "NOT ENOUGH DATA TO DISPLAY", Toast.LENGTH_LONG).show();
                }
                else {
                    dataTextFullName.setText(person.getFullName());
                    dataTextAge.setText("" + person.getAge());
                    dataTextCity.setText(person.getCity());
                    dataTextHobby.setText(person.getHobby());
                }
            }
        });

    }

    private void viewDetailFragment() {
            if (mTablet) {
                FragmentManager fragmentManager =
                        getSupportFragmentManager();
                DetailActivityFragment fragment = new DetailActivityFragment();
                fragmentManager.beginTransaction()
                        .add(R.id.detail_fragment_container, fragment)
                        .commit();
            } else {
                Intent intent = new Intent(this, DetailActivity.class);
                startActivity(intent);
            }
        }

    @Override
    public void onFragmentFinish(String fullName, int age, String city, String hobby) {
        person = new Person(fullName, age, city, hobby);
        DetailActivityFragment detailfragment =
                (DetailActivityFragment) getSupportFragmentManager().
                        findFragmentById(R.id.detail_fragment_container);
        getSupportFragmentManager().beginTransaction()
                .remove(detailfragment)
                .commit();
    }
}
