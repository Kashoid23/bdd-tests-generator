rm -rf build
parcel build *.ts src/*.ts src/**/*.ts --dist-dir ./build --no-source-maps
cp ./logo192.png build/
cp ./manifest.json build/
