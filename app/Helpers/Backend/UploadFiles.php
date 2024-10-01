<?php

use Intervention\Image\Facades\Image;

function UploadFile($file, $path, $encrypt = true)
{
    if ($file->getSize() < 16777216) {

        $extension = $file->extension();

        if (!is_dir(public_path($path))) {
            mkdir(public_path($path), 0755, true);
        }

        if ($encrypt) {
            $md5_file =  md5($file->getClientOriginalName() . date("Y-m-d H:i:s"));
            $file_name = $md5_file . ".{$extension}";
        } else {
            $file_name = $file->getClientOriginalName();
        }

        if ($extension == "png" || $extension == "jpg" || $extension == "webp" || $extension == "jpeg") {
            $img = Image::make($file);
            $img->resize($img->width() * 1, $img->height() * 1);
            $img->save(public_path($path) . "/{$file_name}", 100);
        } else {
            $file->move(public_path($path), $file_name);
        }

        return $file_name;
    }
}

function UploadImageWithWebp($file, $path)
{
    if ($file->getSize() < 16777216) {
        $extension = $file->extension();
        $md5_file =  md5($file->getClientOriginalName() . date("Y-m-d H:i:s"));
        $file_name = $md5_file . ".{$extension}";
        $file_name_webp = $md5_file . ".webp";
        $path_webp = public_path($path) . "/{$file_name_webp}";

        if (!is_dir(public_path($path))) {
            mkdir(public_path($path), 0755, true);
        }

        $img_webp = Image::make($file)->encode('webp', 100);
        $img_webp->resize($img_webp->width() * 1, $img_webp->height() * 1);
        $img_webp->save($path_webp, 100);

        $img = Image::make($file);
        $img->resize($img->width() * 1, $img->height() * 1);
        $img->save(public_path($path) . "/{$file_name}", 100);

        return array($file_name, $file_name_webp);
    }
}
