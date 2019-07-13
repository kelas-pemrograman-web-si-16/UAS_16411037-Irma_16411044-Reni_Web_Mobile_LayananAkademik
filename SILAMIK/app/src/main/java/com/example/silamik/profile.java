package com.example.silamik;

import android.app.ProgressDialog;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.EditText;
import android.widget.Toast;

import com.android.volley.DefaultRetryPolicy;
import com.android.volley.Request;
import com.android.volley.Response;
import com.android.volley.RetryPolicy;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.example.silamik.server.AppController;
import com.example.silamik.server.Config_URL;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

import butterknife.BindView;
import butterknife.ButterKnife;
import butterknife.OnClick;

public class profile extends AppCompatActivity {

    @BindView(R.id.edtNpm)
    EditText edtNpm;
    @BindView(R.id.edtNama)
    EditText edtNama;
    @BindView(R.id.edtAlamat)
    EditText edtAlamat;
    @BindView(R.id.edtTTL)
    EditText edtTTL;
    @BindView(R.id.edtJK)
    EditText edtJK;

    String strNpm, strNama, strAlamat, strTTL, strJK;


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);
        ButterKnife.bind(this);

    }

    @OnClick(R.id.btnSimpan)
    void btnSimpan () {
        String strNpm, strNama, strSemester, strTTL, strJK;

        strNpm = edtNpm.getText().toString();
        strNama = edtNama.getText().toString();
        strSemester = edtAlamat.getText().toString();
        strTTL = edtTTL.getText().toString();
        strJK = edtTTL.getText().toString();

        if (strNpm.isEmpty() || strNama.isEmpty() || strSemester.isEmpty() || strTTL.isEmpty() || strJK.isEmpty()) {
            Toast.makeText(getApplicationContext(),
                    "Lengkapi data", Toast.LENGTH_LONG).show();
        } else {
            Intent a = new Intent(profile.this,
                    Home.class);
            Toast.makeText(getApplicationContext(),
                    "Succses", Toast.LENGTH_LONG).show();
            a.putExtra("mk", strNpm);
            startActivity(a);
            finish();
        }
    }
    @OnClick(R.id.btnKembali)
    void btnKembali() {
        ;
        Intent a = new Intent(profile.this, Home.class);
        startActivity(a);
        finish();
    }

}

