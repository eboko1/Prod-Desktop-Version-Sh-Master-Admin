/// <reference types="cypress" />

const url = ''   


const baseUrl = 'https://'+url+'my.carbook.pro';
const appointments = 'https://'+url+'my.carbook.pro/orders/appointments';
const approve = 'https://'+url+'my.carbook.pro/orders/approve';
const progress = 'https://'+url+'my.carbook.pro/orders/progress';
const success = 'https://'+url+'my.carbook.pro/orders/success';
const cancel = 'https://'+url+'my.carbook.pro/orders/cancel';


var date = new Date();
const idClient =''+date.getDate()+date.getMonth()+date.getMinutes();
var second = parseInt(date.getSeconds())+10
var minute = parseInt(date.getMinutes())+10
var codeNZ =''

//const idClient ='22950'


describe ('DesktopSH|Dev|UA|CarBook', function(){
  beforeEach('User LogIn ', () => {
    cy.visit(baseUrl)
    cy.get('#login.ant-input').type(Cypress.env('ProdAdminLogin'));  
    cy.get('#password').type(Cypress.env('ProdAdminPassword'));         
    cy.get('button').click()
    cy.intercept('GET', baseUrl+'/dashboard')
    
  });

  it('Профіль вибір українського інтерфейсу', function(){
        cy.get('.styles-m__logo---2zDPJ').click()
        cy.get('.styles-m__title---Nwr2X').contains('Календар Завантаження');
        cy.get('.styles-m__userName---h3mg1').click()
        .then (()=>{
        cy.get('#businessTypes > .ant-select-selection').click()
        cy.contains('Шиномонтаж').click();
        cy.wait(2000)
        cy.get('#language').click()
        cy.contains('Українська').click();
        cy.wait(1000)
        })
        .then (()=>{
            cy.get('.ant-btn').first().click({force: true});
        })
    })

    it('+Клієнта та а/м: '+idClient, function(){
        cy.get('.styles-m__logo---1OVEG').click()
        cy.wait(1000)
        cy.contains('Ремонти').click({force: true})
        .then(()=>{
            cy.log('Вибір Меню ремонти');
            cy.get('a > .ant-btn').click(); // add н/з
        })
        .then(()=>{
            cy.wait(3000)
            cy.log('Додати клієнта через +');
            cy.get('.anticon-plus > svg').click()

        })
        .then(()=>{
            cy.log('Модалка Додати Клієнта')
            cy.get('#name').type('БазовийКлієнт' + idClient)
            cy.get('#patronymic').type('По батькові')
            cy.get('#surname').type('Прізвище')
            .then(()=>{
                cy.get('#sex').click();
                cy.contains('Чоловіча').click();
            })
            .then(()=>{
                cy.get('#status').click();
                cy.contains('Преміум').click();
            })
            .then(()=>{
                cy.log('Дата народження клієнта ');
                cy.get('#birthday').click();
                cy.contains('10').click();
            })
            .then(()=>{
                cy.get('#source').click();
                cy.contains('CarBook').click()
            })
            .then(()=>{
                cy.get('#paymentRespite').first().type('5');

            })
            .then(()=>{
                cy.log('Номер телефону клієнта');
                cy.get('.ant-input-number-input').eq(1).type(second+'0'+minute+''+second+''+minute)
            })
            .then(()=>{
                cy.log('Додавання АВТО');
                cy.get('.styles-m__addVehicleButtonCont---Y1h26 > .ant-btn').first().click({ force: true }) //{ force: true }
            })
            .then(()=>{
                cy.log('Додавання Держ.номера а/м');
                cy.get('#vehicle_add_from_number').clear().type('АО6028ВО')
            })
            .then(()=>{
                cy.log('VIN авто');
                cy.get('#vehicle_add_from_vin').type('MDHFBUK13U0107589');
                cy.wait(2000)
            })
            .then(()=>{
                cy.log('Рік авто');
                cy.get(':nth-child(3) > .ant-col-12').click().type('Чорний')
                cy.wait(2000)
                cy.get('.ant-select-dropdown-menu-item-active').click()
                cy.wait(2000)
            })
            .then(()=>{
                cy.log('Рік авто');
                cy.get(':nth-child(4) > .ant-col-12').click().type('2014')
                cy.wait(2000)
                cy.get('.ant-select-dropdown-menu-item-active').click()
                cy.wait(2000)
            })
            .then(()=>{
                cy.log('Марка авто')
                cy.get(':nth-child(5) > .ant-col-12').click().type('NISSAN')
                cy.wait(2000)
                cy.get('.ant-select-dropdown-menu-item-active').click()
                cy.wait(2000)
            })
            .then(()=>{
                cy.log('Модель авто');
                cy.get(':nth-child(6) > .ant-col-12').click().type('MICRA')
                cy.wait(2000)
                cy.get('.ant-select-dropdown-menu-item-active').click()
                cy.wait(2000)

            })
            .then(()=>{
                cy.log('Модифікація авто');
                cy.get(':nth-child(7) > .ant-col-12').click().type('1.4 16V')
                cy.wait(2000)
                cy.get('.ant-select-dropdown-menu-item-active').click()
            })
            .then(()=>{
                cy.wait(2000)
                cy.log('Кнопка ОК');
                cy.get('.ant-btn-primary').eq(5).click()  // first()      .first().click({ force: true })
            })
        })
        .then(()=>{
            cy.log('АВТО ДОДАНО');
            cy.wait(3000)
        })
        .then(()=>{
           cy.get('.ant-btn-primary').eq(4).click();
           cy.get('.ant-btn-primary').contains('Додати').click({force: true} )
           cy.wait(3000)
        })
    });

  it('Редагування мобільного номера для клієнта:'+idClient, function(){
    cy.get('.styles-m__logo---1OVEG').click()
    cy.get(':nth-child(2) > .ant-menu-submenu-title').click()
    cy.contains('Клієнти').click()
      .then(()=>{
          cy.wait(5000)
          cy.log('Пошук клієнта');
          cy.get('.ant-input').last().type('БазовийКлієнт'+idClient)  //
          cy.wait(5000)

      })
      .then(()=>{
        cy.get('.styles-m__clientLink---2KHGM').first().click()
        cy.wait(2000)
      })
      .then(()=>{
        cy.get('.ant-input-number-input').eq(1).focus().clear('0').type('0683781977')
        cy.wait(2000)
      })
      .then(()=>{
        cy.get('.ant-modal-confirm-title').should('exist');
        cy.get('.ant-modal-confirm-btns > .ant-btn').click()
        cy.wait(2000)
        cy.get('.styles-m__editClientForm---2hdWi > .ant-btn').click()
      })
      .then(()=>{
        cy.wait(5000)
      })
    })

    it('Додати Н/З, підтягування клієнта через пошук, клієнт: '+idClient, function(){
        cy.get('.styles-m__logo---1OVEG').click()//menu
        cy.contains('Ремонти').click()
          .then(()=>{
              cy.log('Вибір Меню ремонти');
              cy.get('a > .ant-btn').click(); // add н/з
          })
          .then(()=>{
            cy.wait(3000)
            cy.get('#searchClientQuery').clear().type('Клієнт'+idClient)
          })
          .then(()=>{
              cy.get('.ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(1)').first().click();
            })
          .then(()=>{
            cy.get('.ant-btn').first().click();
          })
          .then(()=>{
            cy.wait(7000)
            cy.log('Ремонт ДОДАНО');
          })
    });

  it('Редагування н/з та додавання Поста, Механіка, Готівки, Реквізити STO, Тип Заміни', function(){
      cy.get('.styles-m__logo---1OVEG').click()//menu
      cy.log('Вибір Меню ремонти');
      cy.contains('Ремонти').click()
        .then(()=>{
            cy.get('.ant-input-search > .ant-input').type(idClient)
            cy.wait(2000);
            cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true });//Нові н/з
        })
        .then(()=>{
            cy.log('Вибір Поста');
            cy.get('.ant-select-selection').eq(1).type('Пост');
            cy.get('.ant-select-dropdown-menu-item-active').click();
        })
        .then(()=>{
            cy.log('Вибір Механіка');
            cy.get('#employee').type('Механік')
            cy.get('.ant-select-dropdown-menu-item-active').click();
        })
        .then(()=>{
            cy.log('Вибір Готівка');
            cy.get('#paymentMethod').click();
            cy.get('.ant-select-dropdown-menu-item-active').first().click({ force: true })
        })
        .then(()=>{
            cy.log('Тип заміни');
            cy.get('#replacementType').click();
            cy.get('.ant-select-dropdown-menu-item-active').first().click({ force: true })
        })
        .then(()=>{
            cy.get('.anticon-save').click() // зберегти картку
        })
        .then(()=>{
            cy.log('Процес Збереження н/з ');
            cy.wait(3000);
        })
  });


  it('Перевід у статус Запис', function(){
      cy.get('.styles-m__logo---1OVEG').click()//menu
      cy.log('Вибір Меню ремонти'+ cy.url());
      cy.contains('Ремонти').first().click({ force: true })
        .then(()=>{
            cy.get('.ant-input-search > .ant-input').type(idClient)
            cy.wait(2000);
            cy.get('.styles-m__ordernLink---2V9V3').first().click({ force: true });
            cy.url().should('include', '/order/')
        })
        .then(()=>{
            cy.wait(5000);
            cy.get('.styles-m__dropdownTitle---3Vlog > :nth-child(2) > span').click(); // Статус Запис
        })
        .then(()=>{
            cy.get('.ant-dropdown-menu-item').contains('Запис').click()
            cy.log('Перевести н/з в статус Запис');
            cy.wait(3000);
        })
        .then(()=>{
            cy.get('.anticon-save').click() // зберегти картку
            cy.wait(3000);
            cy.log('Процес Збереження н/з ');
        })
        .then(()=>{
            cy.get('.anticon-close').first().click({ force: true }); // закрити картку
        })
        .then(()=>{
            cy.wait(2000);
        })
  });

  it('Додавання Робіт', function(){
    cy.visit(approve)
        .then(()=>{
            cy.get('.ant-input-search > .ant-input').type(idClient)
            cy.wait(2000);
            cy.get('.styles-m__ordernLink---2V9V3').first().click({force: true});
            cy.log('Вибір Запису');
        })
        .then(()=>{
            cy.wait(2000)
            cy.get('.ant-btn').eq(1).click()
        })
        .then(()=>{
            cy.get('.ant-table-row > :nth-child(1) > .ant-select > .ant-select-selection').type('Балансування диска').click();
            cy.wait(1000)
        })
        .then(()=>{
            cy.wait(1000)
            cy.get(':nth-child(5) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().type('112')
            cy.wait(2000)
           // cy.get(':nth-child(6) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().clear().type('2')
         })
        .then(()=>{
            cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true})
            cy.wait(3000);
        })
    });

// //   it('Перевірка Найменування та Ціни доданої Роботи', function(){
// //         cy.visit(approve);
// //         cy.wait(3000);
// //         cy.get('.ant-input-search > .ant-input').type(idClient)
// //         cy.wait(2000);
// //         cy.get('.styles-m__ordernLink---2V9V3').first().click({force: true});
// //         cy.log('Вибір Запису')
// //             .then(()=>{            
// //                 cy.get('.ant-btn').eq(1).click()
// //                 cy.wait(2000)
// //             })
// //             .then(()=>{
// //                 cy.get(':nth-child(1) > .ant-select > .ant-select-selection').contains('Балансування диска')
// //                 cy.wait(3000)
// //             })
// //     });

  it('Додавання Робіт через Комплекси', function(){
        cy.visit(approve);
        cy.wait(3000);
        cy.get('.ant-input-search > .ant-input').type(idClient)
        cy.wait(2000);
        cy.get('.styles-m__ordernLink---2V9V3').first().click({force: true});
        cy.log('Вибір Запису')
            .then(()=>{            
                    cy.wait(2000)
                    cy.get('.styles-m__headerActions---2ZRi3 > .ant-btn').click()
            })
        cy.get('.styles-m__complexSelect---22Viw > .ant-select > .ant-select-selection').click()
        cy.wait(2000)
        cy.get('.ant-select-dropdown-search > .ant-select-search__field__wrap > .ant-select-search__field').type('Шиномонтаж')
        cy.wait(2000)
        cy.get('.ant-select-tree-child-tree > .ant-select-tree-treenode-switcher-open > .ant-select-tree-node-content-wrapper').first().click({force: true});
        cy.wait(2000)
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true});
  })

  it('Видалення Роботи', function(){
        cy.visit(approve);
        cy.wait(3000);
        cy.get('.ant-input-search > .ant-input').type(idClient)
        cy.wait(2000);
        cy.get('.styles-m__ordernLink---2V9V3').first().click({force: true});
        cy.log('Вибір Запису')
            .then(()=>{            
                cy.wait(2000)
                cy.get('[data-row-key="1"] > :nth-child(7) > .anticon > svg').last().click({force: true});
                cy.wait(2000)
                cy.get('.ant-popover-buttons > .ant-btn-primary').first().click({force: true});
            })
            .then(()=>{
                cy.wait(2000)
                cy.get('.ant-table-tbody').should('not.contain', 'Шономонтажний комплекс')
                cy.wait(8000)
            })
    });

    it('Додавання Запчастин через Комплекси', function(){
        cy.visit(approve);
        cy.wait(3000);
        cy.get('.ant-input-search > .ant-input').type(idClient)
        cy.wait(2000);
        cy.get('.styles-m__ordernLink---2V9V3').first().click({force: true}); //вибір ремонту в записах
        cy.log('Вибір Запису')
        cy.get('.styles-m__headerActions---2ZRi3 > .ant-btn').click()
        cy.wait(2000);
        cy.get('.styles-m__detailsList---3jg06 > .styles-m__listRow---2lt3h > .styles-m__nameField---3rhCH > .ant-select > .ant-select-selection').click()
        cy.wait(2000)
        cy.get('#rc-tree-select-list_2 > .ant-select-dropdown-search > .ant-select-search__field__wrap > .ant-select-search__field').type('Шини для легкових автомобілів')
        cy.wait(2000)
        cy.get(':nth-child(3) > :nth-child(1) > .ant-select-tree-child-tree > .ant-select-tree-treenode-switcher-open > .ant-select-tree-node-content-wrapper > .ant-select-tree-title').first().click({force: true});
        cy.wait(2000)
        cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true});
    })

    it('Редагування ЗЧ доданої через Комплекси ', function(){
        cy.visit(approve);
        cy.wait(3000);
        cy.get('.ant-input-search > .ant-input').type(idClient)
        cy.wait(2000);
        cy.get('.styles-m__ordernLink---2V9V3').first().click({force: true}); //вибір ремонту в записах
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(2)').click()
        cy.log('Вибір Запису')
            .then(()=>{            
                cy.wait(2000)
                cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content > .ant-table-body > table > .ant-table-tbody > [data-row-key="0"] > :nth-child(2)').contains('Шина для легкового автомобіля')
            })
            cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content > .ant-table-body > table > .ant-table-tbody > [data-row-key="0"] > :nth-child(1) > [style="display: flex; justify-content: space-evenly;"] > .ant-btn').click()
            cy.wait(2000)
            cy.get(':nth-child(3) > .ant-input-number > .ant-input-number-input-wrap > .ant-input-number-input').clear().clear().type('123')
            cy.wait(2000)
            cy.get('.ant-modal-footer > div > .ant-btn-primary').first().click({force: true});
            cy.wait(7000)

        })

    it('Перевірка табки Історія', function(){
        cy.visit(approve);
        cy.wait(3000);
        cy.get('.ant-input-search > .ant-input').type(idClient)
        cy.wait(2000);
        cy.get('.styles-m__ordernLink---2V9V3').first().click({force: true}); //вибір ремонту в записах
        cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(3)').click()
        cy.log('Вибір Запису')
            .then(()=>{            
                cy.wait(2000)
                cy.get('.ant-tabs-tabpane-active > .ant-table-wrapper > .ant-spin-nested-loading > .ant-spin-container > .ant-table > .ant-table-content > .ant-table-body > table > .ant-table-tbody > .ant-table-row > :nth-child(2)').should('exist')
            })
    })

   
it('Перевід НЗ в статус Ремонту', function(){
    cy.visit(approve);
  //  cy.get('.styles-m__logo---2zDPJ').click()
    cy.wait(3000);
    cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
    cy.wait(2000);
    cy.get('.styles-m__ordernLink---2V9V3').first().click({force: true});
    cy.log('Вибір Н/З');
    cy.wait(4000);
    cy.log('Переведіть н/з в статус Ремонт');
    cy.get('.styles-m__dropdownTitle---3Vlog > :nth-child(2) > span').click();
    cy.wait(1000);
    cy.get('.ant-dropdown-menu-item').contains('Ремонт').click()
    cy.wait(3000);
})

it('Перевірка НЗ в списку Ремонтів', function(){
  cy.visit(progress);
  cy.wait(3000);
  cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
  cy.wait(2000);
  cy.get('.styles-m__ordernLink---2V9V3').first().click({force: true});
  cy.log('Вибір Н/З');
  cy.wait(4000);
  cy.get('.styles-m__title---34B8J').contains('Ремонт')
})

it('Відкриття кaсового Ордера з НЗ', function(){
    cy.visit(progress);
    cy.wait(3000);
    cy.get('.ant-input-search > .ant-input').type(idClient)
    cy.wait(2000);
    cy.get('.styles-m__ordernLink---2V9V3').first().click({force: true});
    cy.log('Вибір Запису')
        .then(()=>{
            cy.wait(2000)
            cy.get('.anticon-dollar').click()
            cy.wait(2000)
            cy.get('.ant-modal-header').contains('Касовий ордер')
            cy.get('.ant-modal-body').should('exist')
            cy.wait(2000)
        })
});

  it('Оплата і видача', function(){
    cy.visit(progress);
    cy.wait(4000);
    cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
    cy.wait(2000);
    cy.get('.styles-m__ordernLink---2V9V3').first().click({force: true});
    cy.log('Вибір Н/З');
    cy.get('.ant-tabs-nav > :nth-child(1) > :nth-child(1)').click();
    cy.wait(1000);
    cy.log('Статус Завершити');
    cy.get('.styles-m__dropdownTitle---3Vlog > :nth-child(2) > span').click();
    cy.wait(2000);
    cy.get('.ant-dropdown-menu-item').contains('Завершено').click()
    cy.wait(4000);
    cy.log('Сплатити радіо-кнопка Так');
    cy.get('#withPayment > :nth-child(1) > :nth-child(2)').click();
    cy.wait(1000);
    cy.log('Вибір Каси');
    cy.get('#cashBoxId').click();
    cy.wait(1000);
    cy.get('.ant-select-dropdown-menu-item').eq(0).click();
    cy.wait(1000);
    cy.get('.styles-m__submit---2hKgG > .ant-btn-primary').click();
    cy.wait(7000);
    cy.get('.styles-m__title---34B8J').contains('Виконано')
    cy.wait(4000);
  });


  it('Додавання Коментарів в НЗ', function(){
        cy.visit(success);
        cy.wait(4000);
        cy.get('.ant-input-search > .ant-input').type(idClient)//пошук
        cy.wait(2000);
        cy.get('.styles-m__ordernLink---2V9V3').first().click({force: true});
        cy.log('Вибір Н/З');
        cy.wait(4000);
        cy.get('#comment').type('ХХХ');
       
    });

  it('Перевірка відкриття модалки створення Працівника', function(){
    cy.get('.styles-m__logo---1OVEG').click()//menu
    cy.get(':nth-child(2) > .ant-menu-submenu-title').click().should('exist');
    cy.contains('Працівники').click()
        .then(()=>{
            cy.get('.ant-btn').click()
            cy.wait(2000)
            cy.get('.ant-form').should('exist');
            cy.get('#jobTitle').type('Test').should('exist');
        })
  });

  it('Перевірка відкриття картки існуючого Працівника', function(){
    cy.get('.styles-m__logo---1OVEG').click()//menu
    cy.get(':nth-child(2) > .ant-menu-submenu-title').click().should('exist');
    cy.contains('Працівники').click()
        .then(()=>{
            cy.get('.styles-m__employeeName---2QyjT').first().click({force: true})
            cy.wait(2000)
            cy.get('.ant-tabs').should('exist');
            cy.wait(2000)
            cy.get(':nth-child(1) > .ant-row > .ant-col-18').contains('Менеджерський доступ');
        })
  });

})