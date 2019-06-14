package com.example.android.fragmentsapp;

import android.content.Context;
import android.content.pm.ActivityInfo;
import android.os.Bundle;
import android.support.v4.app.Fragment;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.EditText;

public class DetailActivityFragment extends Fragment {

    private EditText textFullName, textAge, textCity, textHobby;
    private FragmentListener mListener;

    public DetailActivityFragment() {
    }

    @Override
    public void onAttach(Context context) {
        super.onAttach(context);

        if (!(context instanceof FragmentListener)) throw new AssertionError();
        mListener = (FragmentListener) context;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        View rootView = inflater.inflate(R.layout.fragment_detail, container, false);

        textFullName = (EditText) rootView.findViewById(R.id.textFullName);
        textAge = (EditText) rootView.findViewById(R.id.textAge);
        textCity = (EditText) rootView.findViewById(R.id.textCity);
        textHobby = (EditText) rootView.findViewById(R.id.textHobby);

        Button doneButton = (Button) rootView.findViewById(R.id.done_button);
        doneButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                done();
            }
        });

        return rootView;
    }

    private void done() {
        if (mListener == null)
        {
            throw new AssertionError();
        }
        try {
            String fullName = textFullName.getText().toString();
            int age = Integer.parseInt(textAge.getText().toString());
            String city = textCity.getText().toString();
            String hobby = textHobby.getText().toString();
            mListener.onFragmentFinish(fullName,age,city,hobby);
        } catch (Exception e) {
            //Do nothing
        }

    }

    public interface FragmentListener{
        public void onFragmentFinish(String fullName, int age, String city, String hobby);
    }


}
