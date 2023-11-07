import { SharingService } from './../../shared/services/sharing.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Shoppinglist } from 'src/app/shared/models/Shoppinglist';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit {
  shoppinglist: Array<Shoppinglist> = [];
  loggedInUser?: firebase.default.User | null;
  productObject?: Array<Shoppinglist>;
  selectedSubcategory: any = null;
  quantities: { [subcategory: string]: number } = {};
  quantityInput: number = 0;
  categories = [
    {
      mainCategory: 'Gyümölcs és zöldség',
      subcategories: [
        'Áfonya',
        'Alma',
        'Ananász',
        'Articsóka',
        'Avokádó',
        'Banán',
        'Barack',
        'Bazsalikom',
        'Borsó',
        'Brokkoli',
        'Cékla',
        'Citrom',
        'Csereszenye',
        'Édeskrumpli',
        'Eper',
        'Fejes káposzta',
        'Fejes saláta',
        'Fokhagyma',
        'Füge',
        'Gomba',
        'Görögdinnye',
        'Grapefruit',
        'Gyömbér',
        'Hagyma',
        'Kakukkfű',
        'Karfiol',
        'Kiwi',
        'Koktélparadicsom',
        'Koriander',
        'Körte',
        'Krumpli',
        'Kukorica',
        'Málna',
        'Mandarin',
        'Mangó',
        'Menta',
        'Narancs',
        'Nektarin',
        'Őszibarack',
        'Padlizsán',
        'Paprika',
        'Paradicsom',
        'Petrezselyem',
        'Póréhagyma',
        'Répa',
        'Retek',
        'Rukkola',
        'Saláta',
        'Sárgadinnye',
        'Spárga',
        'Spenót',
        'Sütőtök',
        'Szeder',
        'Szilva',
        'Szőlő',
        'Tök',
        'Uborka',
        'Zeller',
        'Zsálya',
      ],
      isExpanded: false,
    },
    {
      mainCategory: 'Kenyér és sütemény',
      subcategories: [
        'Dobostorta',
        'Donut,fánk',
        'Kenyér',
        'Kifli',
        'Kürtöskalács',
        'Lángos',
        'Lepény',
        'Leveles tészta',
        'Muffin',
        'Palacsinta',
        'Pirított kenyér',
        'Pizzatészta',
        'Zsemle',
      ],
      isExpanded: false,
    },
    {
      mainCategory: 'Tej és sajt',
      subcategories: [
        'Cheddar sajt',
        'Feta sajt',
        'Joghurt',
        'Margarin',
        'Mascarpone sajt',
        'Mozzarella sajt',
        'Parmezán sajt',
        'Reszelt sajt',
        'Szójatej',
        'Tej',
        'Tejföl',
        'Tojás',
        'Túró',
        'Vaj',
      ],
      isExpanded: false,
    },
    {
      mainCategory: 'Hús és hal',
      subcategories: [
        'Bárány',
        'Borjúhús',
        'Csirke',
        'Darlált hús',
        'Felvágottak',
        'Garnélák',
        'Hal',
        'Homár',
        'Kagyló',
        'Kolbász',
        'Lazac',
        'Marhahús',
        'Osztriga',
        'Pick szalámi',
        'Pulyka',
        'Sertéshús',
        'Sonka',
        'Szalonna',
        'Szardella',
        'Tonhal',
      ],
      isExpanded: false,
    },
    {
      mainCategory: 'Kellékek és fűszer',
      subcategories: [
        'Almapüré',
        'Bab',
        'Balzsamecet',
        'BBQ szósz',
        'Cukor',
        'Dió',
        'Ecet',
        'Élesztő',
        'Fahéj',
        'Fekete bors',
        'Juharszirup',
        'Ketchup',
        'Kókusztej',
        'Lencse',
        'Majonéz',
        'Mandula',
        'Mogyoró',
        'Mogyoróvaj',
        'Mustár',
        'Olaj',
        'Olivaolaj',
        'Oregánó',
        'Paprika',
        'Paradicsom püré',
        'Paradicsom szósz',
        'Porcukor',
        'Rozmaring',
        'Só',
        'Sütőpor',
        'Vaníliás cukor',
      ],
      isExpanded: false,
    },
    {
      mainCategory: 'Fagyasztott és készétel',
      subcategories: [
        'Csirkeszárnyak',
        'Fagyasztott zöldségek',
        'Fagylalt',
        'Lasagne',
        'Leves',
        'Pizza',
        'Sültkrumpli',
      ],
      isExpanded: false,
    },
    {
      mainCategory: 'Gabonatermékek',
      subcategories: [
        'Cornflakes',
        'Csicseriborsó',
        'Kuszkusz',
        'Liszt',
        'Müzli',
        'Rizs',
        'Tarhonya',
        'Zabpehely',
      ],
      isExpanded: false,
    },
    {
      mainCategory: 'Nasi',
      subcategories: [
        'Chips',
        'Csokoládé',
        'Desszert',
        'Földimogyoró',
        'Keksz',
        'Lekvár',
        'Méz',
        'Müzliszelet',
        'Pattogatott kukorica',
        'Puding',
        'Rágógumi',
        'Tortilla chips',
        'Zselé',
      ],
      isExpanded: false,
    },
    {
      mainCategory: 'Ital',
      subcategories: [
        'Almalé',
        'Ásványvíz',
        'Energiaital',
        'Fehérbor',
        'Gin',
        'Gyümölcslé',
        'Kakaó',
        'Kávé',
        'Kávékapszula',
        'Kóla',
        'Narancslé',
        'Pálinka',
        'Pezsgő',
        'Rum',
        'Sör',
        'Tea',
        'Tonic',
        'Víz',
        'Vodka',
        'Vörösbor',
        'Whisky',
      ],
      isExpanded: false,
    },
    {
      mainCategory: 'Háztartás',
      subcategories: [
        'Alufólia',
        'Elemek',
        'Faszén',
        'Gyertyák',
        'Mosogatógép tabletta',
        'Mosogatószer',
        'Mosószer',
        'Öblítő',
        'Papírtörlő',
        'Sütőpapír',
        'Szalvéta',
        'Szemeteszacskó',
        'Szivacs',
        'Tisztító szerek',
        'Villanykörte',
        'WC tisztító',
      ],
      isExpanded: false,
    },
    {
      mainCategory: 'Szépségápolás és Egészség',
      subcategories: [
        'Ajakápoló',
        'Arckrém',
        'Borotvahab',
        'Borotva',
        'Dezodor',
        'Fogkefe',
        'Fogkrém',
        'Fájdalomcsillapító',
        'Fogselyem',
        'Fülpucoló',
        'Hajlakk',
        'Hajzselé',
        'Kézkenőcs',
        'Körömlakk',
        'Napkrém',
        'Pelenka',
        'Ragtapasz',
        'Sampon',
        'Szájvíz',
        'Szappan',
        'Testápoló',
        'Tusfürdő',
        'Vitaminok',
        'WC papír',
        'Zsebkendő',
      ],
      isExpanded: false,
    },
    {
      mainCategory: 'Állatellátmány',
      subcategories: [
        'Haleledel',
        'Kutyaeledel',
        'Macska alom',
        'Macska eledel',
        'Madáreledel',
      ],
      isExpanded: false,
    },
  ];

  checkedItems: Set<number> = new Set<number>();

  constructor(
    private router: Router,
    private shoppingListService: ShoppingListService,
    private SharingService: SharingService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.shoppingListService.loadShoppinglist().subscribe((data) => {
      this.shoppinglist = data;
      this.shoppinglist.forEach((item, index) => {
        if (item.checked) {
          this.checkedItems.add(index);
        } else {
          this.checkedItems.delete(index);
        }
      });
    });

    this.authService.isUserLoggedIn().subscribe(
      (user) => {
        this.loggedInUser = user;
      },
      (error) => {
        console.error(error);
      }
    );

    this.categories.forEach((category) => {
      category.subcategories.forEach((subcategory) => {
        this.quantities[subcategory] = 0;
      });
    });
  }

  addToShoppingList(subcategory: string) {
    const quantity = this.quantities[subcategory] || 0;

    if (quantity > 0 && this.loggedInUser?.uid) {
      const existingItem = this.shoppinglist.find(
        (item) => item.name === subcategory
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        this.shoppingListService.update(existingItem).then(() => {
          this.quantities[subcategory] = 0;
        });
      } else {
        const newItem: Shoppinglist = {
          user_id: this.loggedInUser.uid,
          id: '',
          name: subcategory,
          quantity: quantity,
          checked: false,
        };

        this.shoppingListService.create(newItem).then(() => {
          this.quantities[subcategory] = 0;
        });
      }
    }
  }
  toggleItem(index: number) {
    if (this.checkedItems.has(index)) {
      this.checkedItems.delete(index);
      this.shoppinglist[index].checked = false;
    } else {
      this.checkedItems.add(index);
      this.shoppinglist[index].checked = true;
    }
  }

  selectSubcategory(category: any) {
    this.selectedSubcategory = category;
  }

  goBack() {
    this.selectedSubcategory = null;
  }

  deleteCheckedItems() {
    const itemsToDelete: string[] = [];
    this.checkedItems.forEach((index) => {
      itemsToDelete.push(this.shoppinglist[index].id);
    });

    itemsToDelete.forEach((id) => {
      this.shoppingListService.delete(id).then(() => {
        this.shoppinglist = this.shoppinglist.filter(
          (item) => !itemsToDelete.includes(item.id)
        );
      });
    });

    this.checkedItems.clear();
  }

  async delete(id: string) {
    this.shoppingListService.delete(id);
  }
}
