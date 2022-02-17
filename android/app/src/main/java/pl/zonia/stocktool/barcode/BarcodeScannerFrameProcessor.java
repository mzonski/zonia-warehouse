package pl.zonia.stocktool.barcode;
import android.annotation.SuppressLint;
import android.media.Image;
import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.camera.core.ImageProxy;

import com.facebook.react.bridge.WritableNativeArray;
import com.google.android.gms.tasks.Task;
import com.google.android.gms.tasks.Tasks;
import com.google.mlkit.vision.barcode.BarcodeScanner;
import com.google.mlkit.vision.barcode.BarcodeScannerOptions;
import com.google.mlkit.vision.barcode.BarcodeScanning;
import com.google.mlkit.vision.barcode.common.Barcode;
import com.google.mlkit.vision.common.InputImage;
import com.mrousavy.camera.frameprocessor.FrameProcessorPlugin;

import java.util.List;

public class BarcodeScannerFrameProcessor extends FrameProcessorPlugin {
    private final BarcodeScanner barcodeScanner;

    public BarcodeScannerFrameProcessor() {
        super("scanBarcode");
        BarcodeScannerOptions options = new BarcodeScannerOptions.Builder()
                .setBarcodeFormats(Barcode.FORMAT_EAN_13 | Barcode.FORMAT_EAN_8)
                .build();
        barcodeScanner = BarcodeScanning.getClient(options);
    }

    @Nullable
    @Override
    public Object callback(@NonNull ImageProxy image, @NonNull Object[] params) {
        @SuppressLint("UnsafeOptInUsageError") Image mediaImage = image.getImage();

        if (mediaImage == null) return null;

        InputImage inputImage =
                InputImage.fromMediaImage(mediaImage, image.getImageInfo().getRotationDegrees());

        Task<List<Barcode>> task = barcodeScanner.process(inputImage);

        try {
            List<Barcode> barcodes = Tasks.await(task);

            WritableNativeArray array = new WritableNativeArray();
            barcodes.forEach(barcode -> array.pushString(barcode.getRawValue()));
            return array;
        } catch (Exception e) {
            e.printStackTrace();
        }

        return null;
    }
}