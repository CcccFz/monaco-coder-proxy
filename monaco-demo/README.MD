https://medium.com/dscddu/language-server-protocol-adding-support-for-multiple-language-servers-to-monaco-editor-a3c35e42a98d
https://github.com/clangd/clangd
https://github.com/TypeFox/monaco-languageclient
https://github.com/wylieconlon/jsonrpc-ws-proxy

apt install -y clangd-12 bear
update-alternatives --install /usr/bin/clangd clangd /usr/bin/clangd-12 100
bear make PREFIX=/opt/lab/tool-chain/gcc-arm-none-eabi/bin/arm-none-eabi- -C .
bear make PREFIX=/opt/lab/tool-chain/Xuantie-900-gcc-elf/bin/riscv64-unknown-elf- -C .
clangd --compile-commands-dir 1112

node dist/server.js --port 50051 --languageServers servers.yml

mm32f5270:
    # Generate dependency information                                                                                                                  
    #CFLAGS += -fno-common \                                                                                                                           
    -ffunction-sections\                                                                                                                               
    -fdata-sections\                                                                                                                                   
    -ffreestanding\                                                                                                                                    
    -fno-builtin\                                                                                                                                      
    -mapcs\                                                                                                                                            
    -mapcs\                                                                                                                                            
    -fno-exceptions\                                                                                                                                   
    -MMD -MP -MF"$(@:%.o=%.d)" -Wimplicit-int

    CFLAGS += -MMD -MP -MF"$(@:%.o=%.d)"  

riscv:
    <!-- generic-rv32, rocket-rv32, sifive-7-rv32, sifive-e31, sifive-e76, generic, rocket, sifive-7-series -->
    -mtune=e906 -march=rv32imaxtheade
    -mtune=generic-rv32 -march=rv32ima
    CompileFlags:
      Add: [-I/opt/lab/tool-chain/gcc-arm-none-eabi/arm-none-eabi/include, -mtune=generic-rv32, -march=rv32ima]

stm32:
    -I/opt/lab/tool-chain/gcc-arm-none-eabi/arm-none-eabi/include \

lx:
    -mtune
    i386, i486, winchip-c6, winchip2, c3, i586, pentium, pentium-mmx, pentiumpro, i686, pentium2, pentium3, pentium3m, pentium-m, c3-2, yonah, pentium4, pentium4m, prescott, nocona, core2, penryn, bonnell, atom, silvermont, slm, goldmont, goldmont-plus, tremont, nehalem, corei7, westmere, sandybridge, corei7-avx, ivybridge, core-avx-i, haswell, core-avx2, broadwell, skylake, skylake-avx512, skx, cascadelake, cooperlake, cannonlake, icelake-client, icelake-server, tigerlake, sapphirerapids, alderlake, knl, knm, lakemont, k6, k6-2, k6-3, athlon, athlon-tbird, athlon-xp, athlon-mp, athlon-4, k8, athlon64, athlon-fx, opteron, k8-sse3, athlon64-sse3, opteron-sse3, amdfam10, barcelona, btver1, btver2, bdver1, bdver2, bdver3, bdver4, znver1, znver2, znver3, x86-64, geode

    -march
    nocona, core2, penryn, bonnell, atom, silvermont, slm, goldmont, goldmont-plus, tremont, nehalem, corei7, westmere, sandybridge, corei7-avx, ivybridge, core-avx-i, haswell, core-avx2, broadwell, skylake, skylake-avx512, skx, cascadelake, cooperlake, cannonlake, icelake-client, icelake-server, tigerlake, sapphirerapids, alderlake, knl, knm, k8, athlon64, athlon-fx, opteron, k8-sse3, athlon64-sse3, opteron-sse3, amdfam10, barcelona, btver1, btver2, bdver1, bdver2, bdver3, bdver4, znver1, znver2, znver3, x86-64, x86-64-v2, x86-64-v3, x86-64-v4