package com.green.smarty.controller;

import com.green.smarty.util.CustomFileUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RequestMapping("/api/files")
@RestController
@RequiredArgsConstructor

public class FileController {
    private CustomFileUtil fileUtil;

    @PostMapping("/upload")
    public ResponseEntity<List<String>> uploadFiles(@RequestParam("files")List<MultipartFile> files) {
        try {
            List<String> uploadedFiles = fileUtil.saveFiles(files);
            return ResponseEntity.ok(uploadedFiles);
        } catch (IOException e) {
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/display/{fileName}")
    public ResponseEntity<Resource> getFile(@PathVariable String fileName) {
        return fileUtil.getFile(fileName);
    }
}
