package com.example.silamik;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;

import butterknife.OnClick;
import butterknife.ButterKnife;

public class Home extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);
        ButterKnife.bind(this);
    }

    @OnClick(R.id.btnlogout)
    void btnlogout(){;
        Intent a = new Intent(Home.this, login.class);
        startActivity(a);
        finish();
    }
    @OnClick(R.id.btnprofile)
    void btnprofile(){;
        Intent a = new Intent(Home.this, profile.class);
        startActivity(a);
        finish();
    }
        @OnClick(R.id.btnkrs)
        void btnkrs() {
            ;
            Intent a = new Intent(Home.this, input_krs.class);
            startActivity(a);
            finish();

        }
    @OnClick(R.id.btnkhs)
    void btnkhs() {
        ;
        Intent a = new Intent(Home.this, khs.class);
        startActivity(a);
        finish();

    }
}

