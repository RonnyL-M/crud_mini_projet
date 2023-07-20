<?php

namespace App\Controller;

use App\Entity\Product;
use Doctrine\ORM\EntityManagerInterface;
use Doctrine\Persistence\ManagerRegistry;
use App\Repository\ProductRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;


class ProductController extends AbstractController
{
    // #[Route('/product', name: 'app_product')]
    // public function index(): Response
    // {
    //     return $this->render('product/index.html.twig', [
    //         'controller_name' => 'ProductController',
    //     ]);
    // }

    #[Route('/create', name:'create_product',methods:['POST'])]
    public function createProduct(ManagerRegistry $doctrine, Request $request):Response {
        $entityManager = $doctrine->getManager();
        
        $product = new Product();
        $product->setName($request->request->get('name'));
        $product->setPrice($request->request->get('price'));
        $product->setQuantity($request->request->get('quantity'));

   
        $entityManager->persist($product);
        $entityManager->flush();
   
        return $this->json('Created new product successfully with id ' . $product->getId());
    }

    #[Route('/delete/{id}', name:'delete_product',methods:['DELETE'])]
    public function delete(ManagerRegistry $doctrine, int $id): Response {
        $entityManager = $doctrine->getManager();
        $product = $entityManager->getRepository(Product::class)->find($id);
        if (!$product) {
            return $this->json('No product found for id ' . $id, 404);
        }
        
        $entityManager->remove($product);
        $entityManager->flush();
        
        return $this->json('Deleted a project successfully with id ' . $id);

    }


    #[Route('/product/{id}', name:'show_products',methods:['GET'])]
    public function show(ManagerRegistry $doctrine, int $id){
        $product = $doctrine->getRepository(Product::class)->find($id);
        if(!$product){
            return $this->json('No product found for id ' . $id, 404);
        }
        $data[] = [
            'id' => $product->getId(),
            'name' => $product->getName(),
            'price' => $product->getPrice(),
            'quantity' => $product->getQuantity(),
       ];
    
        return $this->json($data);
    }

    #[Route('/products', name:'get_products',methods:['GET'])]
    public function index(ManagerRegistry $doctrine): Response
    {
        $products = $doctrine
            ->getRepository(Product::class)
            ->findAll();
   
        $data = [];
   
        foreach ($products as $product) {
           $data[] = [
                'id' => $product->getId(),
                'name' => $product->getName(),
                'price' => $product->getPrice(),
                'quantity' => $product->getQuantity(),
           ];
        }
   
   
        return $this->json($data);
    }

    #[Route('/edit/{id}', name:'edit_product',methods:['PATCH'])]
    public function edit(ManagerRegistry $doctrine,Request $request, int $id){
        $entityManager = $doctrine->getManager();
        $product = $entityManager->getRepository(Product::class)->find($id);
        if (!$product) {
            return $this->json('No product found for id ' . $id, 404);
        }
        $content = json_decode($request->getContent());
        $product->setName($content->name);
        $product->setPrice($content->price);
        $product->setQuantity($content->quantity);
        $entityManager->flush();

        return $this->json('Edited a product succedfully with id ' . $id);

    }

    #[Route('/search/{value}', name:'search_products',methods:['GET'])]
    public function search(ManagerRegistry $doctrine, string $value){
        
    }


}
