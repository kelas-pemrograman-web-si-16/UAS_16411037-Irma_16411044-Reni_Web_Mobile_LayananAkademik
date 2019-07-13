package com.example.silamik;

import android.app.ProgressDialog;
import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;
import android.widget.EditText;
import android.widget.Spinner;
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

public class khs extends AppCompatActivity {
    @BindView(R.id.edNpm)
    EditText edNpm;
    @BindView(R.id.edNama)
    EditText edNama;
    @BindView(R.id.edSemester)
    EditText edSemester;
    @BindView(R.id.edMK)
    EditText edMK;
    @BindView(R.id.edIps)
    EditText edIps;
    @BindView(R.id.sp_spiner)
    Spinner sp_piner;


    String strUser;


    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_khs);
        ButterKnife.bind(this);

    }

    @OnClick(R.id.btnSimpan)
    void btnSimpan() {
        String strNpm, strNama, strSemester, strMK, strIps,strSP;

        strNpm = edNpm.getText().toString();
        strNama = edNama.getText().toString();
        strSemester = edSemester.getText().toString();
        strMK = edMK.getText().toString();
        strIps = edIps.getText().toString();
        strSP = sp_piner.getSelectedItem().toString();

        if (strNpm.isEmpty()) {
            Toast.makeText(getApplicationContext(),
                    "Lengkapi data", Toast.LENGTH_LONG).show();
        } else {
            Intent a = new Intent(khs.this,
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
        Intent a = new Intent(khs.this, Home.class);
        startActivity(a);
        finish();
    }
}
