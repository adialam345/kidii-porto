// src/projectsData.ts

import apkgudang from "@/public/apkgudang.png"
import ponpes from "@/public/ponpes.png"
import sensoriot from "@/public/sensoriot.png"
import iotlampu from "@/public/iotlampu.png"

export const projects = [
    {
        id: 1,
        title: 'PONPES MIFTAHUL HUDA | WEBSITE',
        description: 'Pondok Pesantren Miftahul Huda: Sebuah sistem informasi berbasis web menggunakan Laravel untuk manajemen lembaga pendidikan. Fitur utama meliputi autentikasi berbasis peran, manajemen konten dinamis, pendaftaran siswa online, antarmuka responsif, dan arsitektur database yang efisien.',
        tags: ['Laravel', 'Tailwind CSS'],
        image: {ponpes},
        link : "https://github.com/adialam345/ponpes_miftahulhuda"
    },
    {
        id: 2,
        title: 'SISTOK GUDANG | MOBILE',
        description: 'Sisitok Gudang: Adalah aplikasi Android untuk memantau dan mengelola inventaris gudang secara real-time. Fitur utama mencakup pencatatan barang masuk/keluar, manajemen pemasok, autentikasi pengguna, dan sinkronisasi data melalui API dengan arsitektur MVVM dan basis data lokal.',
        tags: ['Kotlin'],
        image: {apkgudang},
        link : "https://github.com/adialam345/sistok_gudang"
    },
    {
        id: 3,
        title: 'MONITORING SENSOR | MOBILE',
        description: 'Monitoring Sensor: Sebuah aplikasi Android untuk memantau data sensor secara real-time menggunakan teknologi Internet of Things (IoT) dan Firebase Realtime Database. Fitur utama meliputi integrasi layanan Google dan antarmuka modern berbasis Material Design untuk tampilan yang intuitif dan responsif.',
        tags: ['Kotlin', 'Firebase', 'IOT'],
        image: {sensoriot},
        link : "https://github.com/adialam345/aplikasi-monitoring-sensor-IOT"
    },
    {
        id: 4,
        title: 'IOT SMART LAMP | WEBSITE',
        description: 'IoT Smart Lamp Monitoring & Control: Sebuah sistem IoT berbasis web untuk memantau dan mengontrol lampu secara real-time menggunakan Firebase Realtime Database. Fitur utama meliputi pemantauan status perangkat, mode otomatis dan manual, deteksi gerakan dengan sensor PIR, serta antarmuka web responsif untuk kendali lampu.',
        tags: ['IOT', 'Firebase'],
        image: {iotlampu},
        link : "https://github.com/adialam345/iot-lampu"
    }
];
