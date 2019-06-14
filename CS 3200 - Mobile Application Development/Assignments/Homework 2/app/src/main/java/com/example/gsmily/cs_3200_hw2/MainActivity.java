package com.example.gsmily.cs_3200_hw2;

import android.app.Activity;
import android.app.ProgressDialog;
import android.graphics.drawable.Drawable;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.util.Log;
import android.view.View;
import android.widget.Button;
import android.widget.ImageView;

import java.io.BufferedInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;
import java.net.URL;
import java.net.URLConnection;

public class MainActivity extends Activity {

    Button mDyers, mMoonPine, mPlumEstate, mUshimachi;
    ImageView mImageView;
    ProgressDialog mProgressBar;
    int mProgressBarStatus = 0;
    Handler mProgressBarHandler = new Handler();
    long mFileSize = 0;
    static final String PROGRESS_MESSAGE = "Downloading image...";
    static final String COMPLETION_MESSAGE = "Download complete ...";
    static final String DYERS_URL = "http://www.ibiblio.org/wm/paint/auth/hiroshige/dyers.jpg";
    static final String MOON_PINE_URL = "http://www.ibiblio.org/wm/paint/auth/hiroshige/moonpine.jpg";
    static final String PLUM_ESTATE_URL = "http://www.ibiblio.org/wm/paint/auth/hiroshige/plum.jpg";
    static final String USHIMACHI_URL = "http://www.ibiblio.org/wm/paint/auth/hiroshige/takanawa.jpg";
    static final String DYERS_PATH = Environment.getExternalStorageDirectory().toString() + "/dyers.jpg";
    static final String MOON_PINE_PATH = Environment.getExternalStorageDirectory().toString() + "/moonPine.jpg";
    static final String PLUM_ESTATE_PATH = Environment.getExternalStorageDirectory().toString() + "/plumEstate.jpg";
    static final String USHIMACHI_PATH = Environment.getExternalStorageDirectory().toString() + "/ushimachi.jpg";

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        mDyers = (Button) findViewById(R.id.dyers);
        mMoonPine = (Button) findViewById(R.id.moonPine);
        mPlumEstate = (Button) findViewById(R.id.plumEstate);
        mUshimachi = (Button) findViewById(R.id.ushimachi);

        mImageView = (ImageView) findViewById(R.id.imageView);
    }

    public void onClickHandlerDyers(View view) {
        // Prepare the progressbar
        mProgressBar = new ProgressDialog(view.getContext());
        mProgressBar.setCancelable(true);
        mProgressBar.setMessage(PROGRESS_MESSAGE);
        mProgressBar.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        mProgressBar.setProgress(0);
        mProgressBar.setMax(100);
        mProgressBar.show();

        // reset status
        mProgressBarStatus = 0;

        // reset fileSize
        mFileSize = 0;

        Thread thread = new Thread() {
            public void run() {
                networkFileDownloadDyers();
            }
        };
        thread.start();
    }

    public void onClickHandlerMoonPine(View view) {
        // Prepare the progressbar
        mProgressBar = new ProgressDialog(view.getContext());
        mProgressBar.setCancelable(true);
        mProgressBar.setMessage(PROGRESS_MESSAGE);
        mProgressBar.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        mProgressBar.setProgress(0);
        mProgressBar.setMax(100);
        mProgressBar.show();

        // reset status
        mProgressBarStatus = 0;

        // reset fileSize
        mFileSize = 0;

        Thread thread = new Thread() {
            public void run() {
                networkFileDownloadMoonPine();
            }
        };
        thread.start();
    }

    public void onClickHandlerPlumEstate(View view) {
        // Prepare the progressbar
        mProgressBar = new ProgressDialog(view.getContext());
        mProgressBar.setCancelable(true);
        mProgressBar.setMessage(PROGRESS_MESSAGE);
        mProgressBar.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        mProgressBar.setProgress(0);
        mProgressBar.setMax(100);
        mProgressBar.show();

        // reset status
        mProgressBarStatus = 0;

        // reset fileSize
        mFileSize = 0;

        Thread thread = new Thread() {
            public void run() {
                networkFileDownloadPlumEstate();
            }
        };
        thread.start();
    }

    public void onClickHandlerUshimachi(View view) {
        // Prepare the progressbar
        mProgressBar = new ProgressDialog(view.getContext());
        mProgressBar.setCancelable(true);
        mProgressBar.setMessage(PROGRESS_MESSAGE);
        mProgressBar.setProgressStyle(ProgressDialog.STYLE_HORIZONTAL);
        mProgressBar.setProgress(0);
        mProgressBar.setMax(100);
        mProgressBar.show();

        // reset status
        mProgressBarStatus = 0;

        // reset fileSize
        mFileSize = 0;

        Thread thread = new Thread() {
            public void run() {
                networkFileDownloadUshimachi();
            }
        };
        thread.start();
    }

    public void networkFileDownloadDyers() {
        while (mProgressBarStatus != 100) {
            int count;
            try {
                URL url = new URL(DYERS_URL);
                URLConnection conection = url.openConnection();
                conection.connect();
                // getting file length
                int lengthOfFile = conection.getContentLength();
                // input stream to read file - with 8k buffer
                InputStream input = new BufferedInputStream(url.openStream(), 8192);
                // Output stream to write file
                OutputStream output = new FileOutputStream(DYERS_PATH);

                byte data[] = new byte[1024];

                long total = 0;

                while ((count = input.read(data)) != -1) {
                    total += count;

                    // writing data to file
                    output.write(data, 0, count);
                    // publishing the progress....
                    // After this onProgressUpdate will be called
                    mProgressBarStatus = (int) ((total * 100) / lengthOfFile);
                    // update the progress bar
                    mProgressBarHandler.post(new Runnable() {

                        @Override
                        public void run() {

                            mProgressBar.setProgress(mProgressBarStatus);
                            if (mProgressBarStatus == 100) {
                                mProgressBar.setMessage(COMPLETION_MESSAGE);
//                                mProgressBar.setMessage(FILE_PATH);
                                mImageView.setImageDrawable(Drawable
                                        .createFromPath(DYERS_PATH));
                            }
                        }
                    });
                }

                // flushing output
                output.flush();

                // closing streams
                output.close();
                input.close();

            } catch (Exception e) {
                Log.e("Error: ", e.getMessage());
            }

        }
        // after Download is complete
        if (mProgressBarStatus >= 100) {
            // sleep 2 seconds, so that you can see the 100%
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            mProgressBar.dismiss();
        }
    }

    public void networkFileDownloadMoonPine() {
        while (mProgressBarStatus != 100) {
            int count;
            try {
                URL url = new URL(MOON_PINE_URL);
                URLConnection conection = url.openConnection();
                conection.connect();
                // getting file length
                int lengthOfFile = conection.getContentLength();
                // input stream to read file - with 8k buffer
                InputStream input = new BufferedInputStream(url.openStream(), 8192);
                // Output stream to write file
                OutputStream output = new FileOutputStream(MOON_PINE_PATH);

                byte data[] = new byte[1024];

                long total = 0;

                while ((count = input.read(data)) != -1) {
                    total += count;

                    // writing data to file
                    output.write(data, 0, count);
                    // publishing the progress....
                    // After this onProgressUpdate will be called
                    mProgressBarStatus = (int) ((total * 100) / lengthOfFile);
                    // update the progress bar
                    mProgressBarHandler.post(new Runnable() {

                        @Override
                        public void run() {

                            mProgressBar.setProgress(mProgressBarStatus);
                            if (mProgressBarStatus == 100) {
                                mProgressBar.setMessage(COMPLETION_MESSAGE);
//                                mProgressBar.setMessage(FILE_PATH);
                                mImageView.setImageDrawable(Drawable
                                        .createFromPath(MOON_PINE_PATH));
                            }
                        }
                    });
                }

                // flushing output
                output.flush();

                // closing streams
                output.close();
                input.close();

            } catch (Exception e) {
                Log.e("Error: ", e.getMessage());
            }

        }
        // after Download is complete
        if (mProgressBarStatus >= 100) {
            // sleep 2 seconds, so that you can see the 100%
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            mProgressBar.dismiss();
        }
    }

    public void networkFileDownloadPlumEstate() {
        while (mProgressBarStatus != 100) {
            int count;
            try {
                URL url = new URL(PLUM_ESTATE_URL);
                URLConnection conection = url.openConnection();
                conection.connect();
                // getting file length
                int lengthOfFile = conection.getContentLength();
                // input stream to read file - with 8k buffer
                InputStream input = new BufferedInputStream(url.openStream(), 8192);
                // Output stream to write file
                OutputStream output = new FileOutputStream(PLUM_ESTATE_PATH);

                byte data[] = new byte[1024];

                long total = 0;

                while ((count = input.read(data)) != -1) {
                    total += count;

                    // writing data to file
                    output.write(data, 0, count);
                    // publishing the progress....
                    // After this onProgressUpdate will be called
                    mProgressBarStatus = (int) ((total * 100) / lengthOfFile);
                    // update the progress bar
                    mProgressBarHandler.post(new Runnable() {

                        @Override
                        public void run() {

                            mProgressBar.setProgress(mProgressBarStatus);
                            if (mProgressBarStatus == 100) {
                                mProgressBar.setMessage(COMPLETION_MESSAGE);
//                                mProgressBar.setMessage(FILE_PATH);
                                mImageView.setImageDrawable(Drawable
                                        .createFromPath(PLUM_ESTATE_PATH));
                            }
                        }
                    });
                }

                // flushing output
                output.flush();

                // closing streams
                output.close();
                input.close();

            } catch (Exception e) {
                Log.e("Error: ", e.getMessage());
            }

        }
        // after Download is complete
        if (mProgressBarStatus >= 100) {
            // sleep 2 seconds, so that you can see the 100%
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            mProgressBar.dismiss();
        }
    }

    public void networkFileDownloadUshimachi() {
        while (mProgressBarStatus != 100) {
            int count;
            try {
                URL url = new URL(USHIMACHI_URL);
                URLConnection conection = url.openConnection();
                conection.connect();
                // getting file length
                int lengthOfFile = conection.getContentLength();
                // input stream to read file - with 8k buffer
                InputStream input = new BufferedInputStream(url.openStream(), 8192);
                // Output stream to write file
                OutputStream output = new FileOutputStream(USHIMACHI_PATH);

                byte data[] = new byte[1024];

                long total = 0;

                while ((count = input.read(data)) != -1) {
                    total += count;

                    // writing data to file
                    output.write(data, 0, count);
                    // publishing the progress....
                    // After this onProgressUpdate will be called
                    mProgressBarStatus = (int) ((total * 100) / lengthOfFile);
                    // update the progress bar
                    mProgressBarHandler.post(new Runnable() {

                        @Override
                        public void run() {

                            mProgressBar.setProgress(mProgressBarStatus);
                            if (mProgressBarStatus == 100) {
                                mProgressBar.setMessage(COMPLETION_MESSAGE);
//                                mProgressBar.setMessage(FILE_PATH);
                                mImageView.setImageDrawable(Drawable
                                        .createFromPath(USHIMACHI_PATH));
                            }
                        }
                    });
                }

                // flushing output
                output.flush();

                // closing streams
                output.close();
                input.close();

            } catch (Exception e) {
                Log.e("Error: ", e.getMessage());
            }

        }
        // after Download is complete
        if (mProgressBarStatus >= 100) {
            // sleep 2 seconds, so that you can see the 100%
            try {
                Thread.sleep(2000);
            } catch (InterruptedException e) {
                // TODO Auto-generated catch block
                e.printStackTrace();
            }

            mProgressBar.dismiss();
        }
    }



}
