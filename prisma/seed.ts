import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.locaisSenai.createMany({
    data: [
      { nome: 'Sala 203B' },
      { nome: 'Banheiro masculino 3º andar Bloco B' },
      { nome: 'Corredor 2º andar Bloco A' },
      { nome: 'Biblioteca Bloco C' },
      { nome: 'Recepção Bloco Principal' },
    ],
    skipDuplicates: true,
  });

  await prisma.user.createMany({
    data: [
      { nome: 'Alice Santos', cpf: '12345678900', email: 'alice@example.com' },
      { nome: 'Bruno Costa', cpf: '23456789011', email: 'bruno@example.com' },
      { nome: 'Carla Lima', cpf: '34567890122', email: 'carla@example.com' },
      { nome: 'Diego Souza', cpf: '45678901233', email: 'diego@example.com' },
      {
        nome: 'Eduarda Pires',
        cpf: '56789012344',
        email: 'eduarda@example.com',
      },
    ],
    skipDuplicates: true,
  });

  const locais = await prisma.locaisSenai.findMany();
  const usuarios = await prisma.user.findMany();

  await prisma.item.createMany({
    data: [
      {
        item: 'Guarda-chuva',
        descricao: 'Preto com detalhes vermelhos',
        imagem_URL:
          'https://png.pngtree.com/png-vector/20250408/ourmid/pngtree-a-black-umbrella-with-red-interior-isolated-png-image_15932081.png',
        data_encontrado: new Date('2024-06-01'),
        local_encontrado_id: locais[0].id,
      },
      {
        item: 'Mochila',
        descricao: 'Mochila azul com livros',
        imagem_URL:
          'https://havaianas.com.br/cdn/shop/files/4147928_0089_BACKPACK-COLOR_A.png?v=1734125170',
        data_encontrado: new Date('2024-06-02'),
        local_encontrado_id: locais[1].id,
        usuario_devolvido_id: usuarios[0].id,
      },
      {
        item: 'Chaveiro',
        descricao: 'Chaveiro com duas chaves e pingente',
        imagem_URL:
          'https://static.vecteezy.com/system/resources/previews/045/809/782/non_2x/unlock-happiness-house-key-keychain-silhouettes-free-png.png',
        data_encontrado: new Date('2024-06-03'),
        local_encontrado_id: locais[2].id,
      },
      {
        item: 'Estojo',
        descricao: 'Estojo preto com canetas coloridas',
        imagem_URL:
          'https://cdn.awsli.com.br/600x450/1808/1808963/produto/242215273/preto6-ka8stw6682.png',
        data_encontrado: new Date('2024-06-04'),
        local_encontrado_id: locais[0].id,
      },
      {
        item: 'Fone de ouvido',
        descricao: 'Fone bluetooth preto',
        imagem_URL:
          'https://images.kabum.com.br/produtos/fotos/sync_mirakl/879208/medium/Fone-Qcy-Ailybuds-E10-Hi-res-Ldac-Preto_1748432687.png',
        data_encontrado: new Date('2024-06-05'),
        local_encontrado_id: locais[3].id,
      },
      {
        item: 'Garrafa térmica',
        descricao: 'Branca com tampa preta',
        imagem_URL:
          'https://crousadia.com.br/wp-content/uploads/2024/08/GARRAFA-BRANCA-01.png',
        data_encontrado: new Date('2024-06-06'),
        local_encontrado_id: locais[4].id,
        usuario_devolvido_id: usuarios[1].id,
      },
      {
        item: 'Caderno',
        descricao: 'Caderno universitário capa vermelha',
        imagem_URL:
          'https://3bcadernos.com.br/wp-content/uploads/2020/11/4-2.png',
        data_encontrado: new Date('2024-06-07'),
        local_encontrado_id: locais[2].id,
      },
      {
        item: 'Óculos',
        descricao: 'Óculos de grau preto',
        imagem_URL:
          'https://images.tcdn.com.br/img/img_prod/765040/armacao_oculos_de_grau_ray_ban_masculino_1039_2_a5b78a56b4a1d61ba6ae987278bfafe2.png',
        data_encontrado: new Date('2024-06-08'),
        local_encontrado_id: locais[1].id,
      },
      {
        item: 'Pen Drive',
        descricao: 'Pen Drive 16GB preto',
        imagem_URL:
          'https://images.tcdn.com.br/img/img_prod/480889/pendrive_sandisk_ultra_shift_32gb_usb_3_0_flash_drive_5865_1_20201214181026.png',
        data_encontrado: new Date('2024-06-09'),
        local_encontrado_id: locais[0].id,
      },
      {
        item: 'Carteira',
        descricao: 'Carteira marrom com documentos',
        imagem_URL:
          'https://cdn.awsli.com.br/800x800/2681/2681523/produto/249784940/carteira-de-couro-lacee-cl037-caramelo-frente-min-slc095z032.png',
        data_encontrado: new Date('2024-06-10'),
        local_encontrado_id: locais[3].id,
        usuario_devolvido_id: usuarios[2].id,
      },
      {
        item: 'Chave de carro',
        descricao: 'Chave Fiat com controle',
        imagem_URL:
          'https://cdn2.solojavirtual.com/loja/arquivos_loja/64188/Fotos/thumbs3/produto_Foto1_13061018.png?cache=',
        data_encontrado: new Date('2024-06-11'),
        local_encontrado_id: locais[4].id,
      },
      {
        item: 'Livro',
        descricao: 'Livro "O Pequeno Príncipe"',
        imagem_URL:
          'https://harpercollins.com.br/cdn/shop/files/9788595081529_vi_01.png?v=1699557155',
        data_encontrado: new Date('2024-06-12'),
        local_encontrado_id: locais[0].id,
      },
      {
        item: 'Relógio',
        descricao: 'Relógio de pulso preto',
        imagem_URL:
          'https://acdn-us.mitiendanube.com/stores/002/960/648/products/produto-tw2v40400-movimento-do-relogio-analogico-de-quartzo-resistencia-a-agua-50-metros-cristal-lente-vidro-mineral-diametro-da-caixa-46-milimetros-altura-da-caixa-13-milimetros-material-da-caix-35-48fc00617e0f36d29e17390741324101-480-0.png',
        data_encontrado: new Date('2024-06-13'),
        local_encontrado_id: locais[1].id,
      },
      {
        item: 'Blusa',
        descricao: 'Blusa cinza tamanho M',
        imagem_URL:
          'https://d3mstcthfjpw3m.cloudfront.net/Custom/Content/Products/42/69/426942_blusa-manga-curta-zoo-meia-malha-kids_l2_638234587595588558.webp',
        data_encontrado: new Date('2024-06-14'),
        local_encontrado_id: locais[2].id,
      },
      {
        item: 'Celular',
        descricao: 'Celular Samsung preto',
        imagem_URL:
          'https://media.flixcar.com/webp/synd-asset/Samsung-116127624-br-galaxy-s23-s918-sm-s918bzkuzto-534851264--Download-Source--zoom.png',
        data_encontrado: new Date('2024-06-15'),
        local_encontrado_id: locais[3].id,
        usuario_devolvido_id: usuarios[3].id,
      },
      {
        item: 'Carregador',
        descricao: 'Carregador de notebook Dell',
        imagem_URL:
          'https://images.kabum.com.br/produtos/fotos/sync_mirakl/280287/Fonte-Carregador-P-Notebook-Dell-Vostro-3500-19-5v-4-62a-90w-7-4x5-0mm_1669732115_g.jpg',
        data_encontrado: new Date('2024-06-16'),
        local_encontrado_id: locais[4].id,
      },
      {
        item: 'Pendrive',
        descricao: 'Pendrive de 32GB',
        imagem_URL:
          'https://img.irroba.com.br/fit-in/600x600/filters:fill(transparent):quality(80)/vexmieoi/catalog/617.png',
        data_encontrado: new Date('2024-06-17'),
        local_encontrado_id: locais[0].id,
        usuario_devolvido_id: usuarios[4].id,
      },
      {
        item: 'Chave inglesa',
        descricao: 'Chave inglesa em aço cromado',
        imagem_URL:
          'https://images.tcdn.com.br/img/img_prod/1029092/chave_inglesa_ajustavel_12_30cm_4839854_1_37e3c42176ec91cbc6efa72d1745d641.png',
        data_encontrado: new Date('2024-05-10'),
        local_encontrado_id: locais[0].id,
      },
      {
        item: 'Celular Samsung',
        descricao: 'Celular preto com capa vermelha',
        imagem_URL:
          'https://images.samsung.com/is/image/samsung/p6pim/br/ef-pg780tregbr/gallery/br-silicone-cover-for-galaxy-s20-fe-ef-pg780tregbr-333744263?$624_624_PNG$',
        data_encontrado: new Date('2024-05-12'),
        local_encontrado_id: locais[1].id,
        usuario_devolvido_id: usuarios[2].id,
      },
      {
        item: 'Cartão de transporte',
        descricao: 'Riocard mais expresso',
        imagem_URL:
          'https://diariodorio.com/wp-content/uploads/2019/09/a0372166-12c7-4ce4-b01a-8d6c8579825b.png',
        data_encontrado: new Date('2024-05-15'),
        local_encontrado_id: locais[2].id,
      },
      {
        item: 'Livro de Química',
        descricao: 'Livro didático com capa azul',
        imagem_URL:
          'https://paginas.grupoa.com.br/changquimica11ed/img/capa_g2.png',
        data_encontrado: new Date('2024-05-18'),
        local_encontrado_id: locais[3].id,
      },
      {
        item: 'Relógio de pulso',
        descricao: 'Relógio prateado analógico',
        imagem_URL:
          'https://www.seikowatches.com/br-pt/-/media/Images/Product--Image/All/Seiko/2024/02/26/21/15/SPB463J1/SPB463J1.png?mh=360&mw=360&hash=079046B67F0ABA797B963CB5F71D1F2C',
        data_encontrado: new Date('2024-05-20'),
        local_encontrado_id: locais[4].id,
        usuario_devolvido_id: usuarios[0].id,
      },
      {
        item: 'Estojo de óculos',
        descricao: 'Estojo de camurça marrom-escura',
        imagem_URL:
          'https://images2.ray-ban.com//cdn-record-files/crossaccessories/cec410dc-11d6-452a-aab6-b0ba00be27d5/ARB0001AT__000001__CROSS__al2.png',
        data_encontrado: new Date('2024-05-22'),
        local_encontrado_id: locais[1].id,
      },
      {
        item: 'Moletom',
        descricao: 'Moletom cinza tamanho M',
        imagem_URL:
          'https://livinbackyard.shop/cdn/shop/files/MOLETOMSHIELDGARMENTDYED.png?v=1747250055',
        data_encontrado: new Date('2024-05-25'),
        local_encontrado_id: locais[2].id,
        usuario_devolvido_id: usuarios[3].id,
      },
      {
        item: 'Garrafa térmica',
        descricao: 'Garrafa azul com tampa cromada',
        imagem_URL:
          'https://tfdfgu.vtexassets.com/arquivos/ids/171454-800-800?v=638749683022700000&width=800&height=800&aspect=true',
        data_encontrado: new Date('2024-05-28'),
        local_encontrado_id: locais[0].id,
      },
      {
        item: 'Pulseira de couro',
        descricao: 'Pulseira preta de couro',
        imagem_URL:
          'https://caterinamilano.com.br/cdn/shop/products/Courotrancadopretocopy.png?v=1750440594',
        data_encontrado: new Date('2024-06-01'),
        local_encontrado_id: locais[3].id,
      },
      {
        item: 'Notebook Acer',
        descricao: 'Notebook preto com adesivo do Senai',
        imagem_URL:
          'https://conteudoproduto.magazineluiza.com.br/23/238056100/assets/images/notebook_aspire_5_front_lg.png',
        data_encontrado: new Date('2024-06-05'),
        local_encontrado_id: locais[4].id,
        usuario_devolvido_id: usuarios[4].id,
      },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
