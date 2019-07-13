package com.example.silamik;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.Toast;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class login extends AppCompatActivity {

    @BindView(R.id.pw)
    EditText pw;
    @BindView(R.id.edNpm)
    EditText edNpm;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        ButterKnife.bind(this);
    }

    @OnClick(R.id.btnLogin)
    void submit() {

        String strnpm, strpw;

        strnpm = edNpm.getText().toString();
        strpw = pw.getText().toString();

        if (strnpm.isEmpty() && strpw.isEmpty()) {
            Toast.makeText(getApplicationContext(), "Lengkapi Data", Toast.LENGTH_LONG).show();

        } else {
            Intent a = new Intent(login.this, Home.class);
            a.putExtra("Npm", strnpm);
            a.putExtra("Nama", strpw);
            startActivity(a);
            finish();


        }
    }

}